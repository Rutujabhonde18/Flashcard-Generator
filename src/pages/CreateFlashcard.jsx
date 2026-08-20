import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { MdUploadFile, MdAdd } from "react-icons/md";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addFlashcard } from "../redux/flashcardSlice";
import { filetoDataURL } from "../utils/localStorage";
import Loading from "../components/Loading";
import TermInput from "../components/TermInput";
import * as Yup from "yup";

const CreateFlashcard = () => {
  const [groupImagePreview, setGroupImagePreview] = useState(null);
  const [flashcardImages, setFlashcardImages] = useState({});
  const [loading, setLoading] = useState(false);

  const groupFilePicker = useRef(null);

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    groupname: Yup.string()
      .min(3, "Group Name must be atleast 3 characters")
      .required("Group name is required"),

    groupdescription: Yup.string()
      .min(15, "Description must be atleast 10 characters")
      .max(150, "Description must not exceed 150 characters")
      .required("Description is required"),

    flashterms: Yup.array().of(
      Yup.object({
        term: Yup.string()
          .min(3, "Term must be atleast 3 characters")
          .required("Term name is required"),

        defination: Yup.string()
          .min(15, "Defination must be atleast 10 characters")
          .max(150, "Defination must not exceed 150 characters")
          .required("Defination is required"),
      }),
    ),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const groupImage = await filetoDataURL(values.groupImg);

      const terms = await Promise.all(
        values.flashterms.map(async (item) => ({
          id: Date.now() + Math.random(),
          term: item.term,
          definition: item.defination,
          image: await filetoDataURL(item.image),
        })),
      );

      const newflashcard = {
        id: Date.now(),
        title: values.groupname,
        description: values.groupdescription,
        image: groupImage,
        terms,
      };
      dispatch(addFlashcard(newflashcard));

      toast.success("Card created successfully!", {
        position: "top-center",
        autoClose: 3000,
      });

      resetForm();

      setGroupImagePreview(null);
      setFlashcardImages({});

      // Clear group file input
      if (groupFilePicker.current) {
        groupFilePicker.current.value = "";
      }

      // Clear all flashcard file inputs
      document
        .querySelectorAll('input[id^="flashcard-image-"]')
        .forEach((input) => {
          input.value = "";
        });
    } catch (error) {
      console.error("Error creating flashcard:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <ToastContainer />
      {loading && <Loading />}
      <div className="mx-auto">
        <Formik
          initialValues={{
            groupname: "",
            groupImg: null,
            groupdescription: "",

            flashterms: [
              {
                term: "",
                defination: "",
              },
            ],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => {
            const isFlashcardDisabled =
              !values.groupname.trim() || !values.groupdescription.trim();

            return (
              <Form>
                <div className="pt-2 sm:pt-5 mx-7 sm:mx-12 md:mx-20 lg:mx-30 flex flex-col gap-10">
                  {/* ================= GROUP DETAILS ================= */}

                  <div className="rounded-lg bg-white p-6 shadow-lg border-2 border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-8">
                      {/* Group Name */}
                      <div>
                        <label className="mb-2 block font-semibold text-gray-600">
                          Create Group <span className="text-red-600">*</span>
                        </label>

                        <Field
                          className="placeholder-gray-400 p-2 h-10 w-full sm:w-60 border border-gray-400 text-sm rounded-sm focus:outline-none"
                          type="text"
                          placeholder="Enter Group Name"
                          name="groupname"
                          required
                        />

                        <ErrorMessage
                          name="groupname"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      {/* Group Image */}
                      <div className="flex items-end gap-8">
                        <div
                          onClick={() => groupFilePicker.current.click()}
                          className="w-36 h-10 border border-gray-400 rounded-sm cursor-pointer active:scale-95"
                        >
                          <span className="text-sm text-blue-600 flex items-center justify-center h-full font-semibold ">
                            <MdUploadFile className="w-5 h-5 mr-2" />
                            {groupImagePreview
                              ? "Change Image"
                              : "Upload Image"}
                          </span>
                        </div>

                        {groupImagePreview && (
                          <div className="relative">
                            <img
                              src={groupImagePreview}
                              alt="Group Preview"
                              className="h-16 w-32 rounded-md object-cover"
                            />

                            <button
                              type="button"
                              onClick={() => {
                                setGroupImagePreview(null);
                                setFieldValue("groupImg", null);

                                if (groupFilePicker.current) {
                                  groupFilePicker.current.value = "";
                                }
                              }}
                              className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-sm font-bold "
                            >
                              ×
                            </button>
                          </div>
                        )}

                        <input
                          ref={groupFilePicker}
                          type="file"
                          name="groupImg"
                          accept="image/*"
                          className="hidden"
                          onChange={(event) => {
                            const file = event.target.files[0];

                            if (file) {
                              const imageUrl = URL.createObjectURL(file);

                              setGroupImagePreview(imageUrl);
                              setFieldValue("groupImg", file);
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                      <label
                        htmlFor="groupdescription"
                        className="mb-2 block font-semibold text-gray-600"
                      >
                        Add Description <span className="text-red-600">*</span>
                      </label>

                      <Field
                        as="textarea"
                        name="groupdescription"
                        id="groupdescription"
                        placeholder="Describe the roles,responsibility,skills required for the job and help candidate understand the role better. (Max length 150)"
                        rows="5"
                        className="w-4/5 placeholder:text-gray-400 rounded-md border border-gray-400 px-4 py-3 focus:outline-none"
                      />

                      <p className="text-xs text-gray-500 mt-1">
                        {values.groupdescription.length}/150 characters
                      </p>

                      <ErrorMessage
                        name="groupdescription"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>

                  {/* FLASH TERMS */}

                  <div
                    className={`py-3 rounded-md shadow-lg border-2 border-gray-200 bg-white ${
                      isFlashcardDisabled
                        ? "bg-gray-100 opacity-50 pointer-events-none"
                        : "bg-slate-50"
                    }`}
                  >
                    <FieldArray name="flashterms">
                      {({ push, remove }) => (
                        <>
                          {values.flashterms.map((myterms, index) => (
                            <TermInput
                              key={index}
                              index={index}
                              remove={remove}
                              myterms={myterms}
                              setFieldValue={setFieldValue}
                            />
                          ))}

                          {/* ADD MORE */}

                          <button
                            type="button"
                            onClick={() =>
                              push({
                                term: "",
                                defination: "",
                                image: null,
                                imagePreview: null,
                              })
                            }
                            className="flex font-semibold pt-4 pb-2 ml-24 mt-3 text-blue-600 cursor-pointer"
                          >
                            <MdAdd className="self-center mr-1 " />
                            Add more
                          </button>
                        </>
                      )}
                    </FieldArray>
                  </div>

                  {/* ================= SUBMIT ================= */}

                  <div className="text-center">
                    <button
                      type="submit"
                      className="cursor-pointer px-14 py-2 rounded-sm bg-red-600 text-white active:scale-95 hover:bg-white hover:text-red-600 hover:border-2 hover:border-red-600 mb-10"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default CreateFlashcard;
