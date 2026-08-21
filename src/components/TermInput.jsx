import { Field, ErrorMessage } from "formik";
import { MdDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useRef } from "react";

const TermInput = ({ index, remove, myterms, setFieldValue }) => {
  const termInputRefs = useRef([]);
  return (
    <div
      key={index}
      className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6 px-6"
    >
      {/* NUMBER */}
      <div className="w-8 mt-8">
        <div className="bg-red-500 h-6 w-6 rounded-full text-white">
          <span className="flex items-center justify-center font-bold ">
            {index + 1}
          </span>
        </div>
      </div>

      {/* TERM */}
      <div className="lg:w-[28%] w-100% shrink-0 mt-4">
        <label className="block mb-2 text-gray-500 font-bold">
          Enter Term <span className="text-red-600">*</span>
        </label>

        <Field
          name={`flashterms.${index}.term`}
          type="text"
          placeholder="Enter Term"
          innerRef={(el) => {
            termInputRefs.current[index] = el;
          }}
          className="placeholder-gray-300 w-full p-2 h-10 border border-gray-400 rounded-sm focus:outline-none"
        />

        <ErrorMessage
          name={`flashterms.${index}.term`}
          component="div"
          className="text-red-500 text-xs"
        />
      </div>

      {/* DEFINITION */}
      <div className="lg:w-[35%] w-100% shrink-0 mt-4 md:ml-8">
        <label className="block mb-2 text-gray-500 font-semibold">
          Enter Definition <span className="text-red-600">*</span>
        </label>

        <Field
          as="textarea"
          rows="2"
          placeholder="Enter Definition"
          required
          name={`flashterms.${index}.defination`}
          className=" placeholder:text-gray-400 w-full rounded-md border border-gray-400 px-4 py-3 focus:outline-none"
        />

        <ErrorMessage
          name={`flashterms.${index}.defination`}
          component="div"
          className="text-red-500 text-xs"
        />
      </div>

      {/* SELECT IMAGE */}
      <div className="lg:max-w-60 w-90% shrink-0 lg:mt-12">
        {!myterms.imagePreview && (
          <button
            type="button"
            onClick={() =>
              document.getElementById(`flashcard-image-${index}`).click()
            }
            className="w-auto h-12 border border-gray-400 rounded-sm cursor-pointer active:scale-95"
          >
            <span className="text-blue-600 flex items-center justify-center font-semibold px-16">
              Select Image
            </span>
          </button>
        )}

        <input
          id={`flashcard-image-${index}`}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files[0];

            if (file) {
              const imageUrl = URL.createObjectURL(file);

              setFieldValue(`flashterms.${index}.image`, file);

              setFieldValue(`flashterms.${index}.imagePreview`, imageUrl);
            }
          }}
        />

        {/* IMAGE PREVIEW */}
        {myterms.imagePreview && (
          <div className="relative inline-block">
            <img
              src={myterms.imagePreview}
              alt="Preview"
              className="h-16 w-32 rounded-md object-cover"
            />

            <button
              type="button"
              onClick={() => {
                setFieldValue(`flashterms.${index}.image`, null);

                setFieldValue(`flashterms.${index}.imagePreview`, null);

                const input = document.getElementById(
                  `flashcard-image-${index}`,
                );

                if (input) {
                  input.value = "";
                }
              }}
              className="absolute -top-2 -right-2 z-50 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white cursor-pointer"
            >
              <RxCross2 size={10} strokeWidth={1} />
            </button>
          </div>
        )}
      </div>
      {/* DELETE + EDIT */}
      <div className="w-16 lg:mt-14 flex lg:flex-col md:flex-row lg:items-center mx-auto gap-2 text-purple-700">
        {index != 0 && (
          <button
            type="button"
            onClick={() => remove(index)}
            className="cursor-pointer "
          >
            <MdDeleteOutline className="w-5 h-5 text-red-600" />
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            termInputRefs.current[index]?.focus();
          }}
        >
          <BiEdit className="w-5 h-5 text-blue-600 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default TermInput;
