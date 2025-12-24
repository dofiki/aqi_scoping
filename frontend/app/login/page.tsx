"use client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoLogIn } from "react-icons/io5";
import Link from "next/link";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-[80vh] items-center">
      <div className="p-5 h-full flex justify-center pt-25 ">
        <div
          className="md:w-[800px] md:h-[500px] w-full flex flex-col md:flex-row
          shadow-lg shadow-black/40 rounded-lg "
        >
          <div
            className="bg-hover w-full h-[100px]
            md:h-[500px] md:w-[500px]
            rounded-tl-lg rounded-tr-lg
            md:rounded-tr-none md:rounded-bl-0
                        overflow-hidden"
          >
            <svg
              id="visual"
              viewBox="0 700 1500 900"
              width="800"
              height="1300"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
            >
              <path
                d="M0 28L71 28L143 0L214 28L286 37L357 73L429 37L500 55L571 37L643 64L714 19L786 28L857 64L929 28L1000 46L1071 46L1143 73L1214 10L1286 46L1357 64L1429 46L1500 73L1500 0L1429 0L1357 0L1286 0L1214 0L1143 0L1071 0L1000 0L929 0L857 0L786 0L714 0L643 0L571 0L500 0L429 0L357 0L286 0L214 0L143 0L71 0L0 0Z"
                fill="#8bae66"
              ></path>
              <path
                d="M0 100L71 91L143 109L214 28L286 82L357 127L429 154L500 109L571 82L643 136L714 109L786 163L857 181L929 163L1000 163L1071 100L1143 145L1214 91L1286 91L1357 73L1429 46L1500 127L1500 71L1429 44L1357 62L1286 44L1214 8L1143 71L1071 44L1000 44L929 26L857 62L786 26L714 17L643 62L571 35L500 53L429 35L357 71L286 35L214 26L143 0L71 26L0 26Z"
                fill="#7f9f5d"
              ></path>
              <path
                d="M0 136L71 100L143 163L214 55L286 172L357 136L429 172L500 118L571 163L643 145L714 199L786 235L857 181L929 163L1000 226L1071 118L1143 208L1214 181L1286 163L1357 82L1429 91L1500 190L1500 125L1429 44L1357 71L1286 89L1214 89L1143 143L1071 98L1000 161L929 161L857 179L786 161L714 107L643 134L571 80L500 107L429 152L357 125L286 80L214 26L143 107L71 89L0 98Z"
                fill="#739155"
              ></path>
              <path
                d="M0 172L71 199L143 316L214 109L286 199L357 307L429 226L500 118L571 163L643 253L714 325L786 343L857 298L929 244L1000 226L1071 244L1143 352L1214 217L1286 217L1357 118L1429 208L1500 271L1500 188L1429 89L1357 80L1286 161L1214 179L1143 206L1071 116L1000 224L929 161L857 179L786 233L714 197L643 143L571 161L500 116L429 170L357 134L286 170L214 53L143 161L71 98L0 134Z"
                fill="#67824c"
              ></path>
              <path
                d="M0 217L71 235L143 406L214 118L286 226L357 343L429 253L500 172L571 208L643 334L714 397L786 388L857 352L929 307L1000 235L1071 325L1143 388L1214 289L1286 253L1357 154L1429 235L1500 271L1500 269L1429 206L1357 116L1286 215L1214 215L1143 350L1071 242L1000 224L929 242L857 296L786 341L714 323L643 251L571 161L500 116L429 224L357 305L286 197L214 107L143 314L71 197L0 170Z"
                fill="#5c7444"
              ></path>
              <path
                d="M0 640L71 604L143 424L214 307L286 361L357 442L429 586L500 334L571 559L643 586L714 505L786 613L857 406L929 595L1000 388L1071 577L1143 496L1214 388L1286 397L1357 316L1429 271L1500 586L1500 269L1429 233L1357 152L1286 251L1214 287L1143 386L1071 323L1000 233L929 305L857 350L786 386L714 395L643 332L571 206L500 170L429 251L357 341L286 224L214 116L143 404L71 233L0 215Z"
                fill="#50673c"
              ></path>
              <path
                d="M0 712L71 658L143 433L214 343L286 442L357 559L429 595L500 406L571 622L643 604L714 514L786 613L857 451L929 622L1000 397L1071 586L1143 568L1214 442L1286 406L1357 316L1429 316L1500 604L1500 584L1429 269L1357 314L1286 395L1214 386L1143 494L1071 575L1000 386L929 593L857 404L786 611L714 503L643 584L571 557L500 332L429 584L357 440L286 359L214 305L143 422L71 602L0 638Z"
                fill="#465934"
              ></path>
              <path
                d="M0 757L71 721L143 568L214 352L286 505L357 676L429 667L500 577L571 622L643 748L714 577L786 712L857 541L929 649L1000 613L1071 640L1143 577L1214 613L1286 532L1357 370L1429 460L1500 622L1500 602L1429 314L1357 314L1286 404L1214 440L1143 566L1071 584L1000 395L929 620L857 449L786 611L714 512L643 602L571 620L500 404L429 593L357 557L286 440L214 341L143 431L71 656L0 710Z"
                fill="#3b4c2c"
              ></path>
              <path
                d="M0 793L71 793L143 568L214 415L286 541L357 694L429 712L500 595L571 694L643 811L714 649L786 721L857 613L929 685L1000 667L1071 703L1143 631L1214 622L1286 559L1357 415L1429 523L1500 694L1500 620L1429 458L1357 368L1286 530L1214 611L1143 575L1071 638L1000 611L929 647L857 539L786 710L714 575L643 746L571 620L500 575L429 665L357 674L286 503L214 350L143 566L71 719L0 755Z"
                fill="#314025"
              ></path>
              <path
                d="M0 802L71 829L143 568L214 469L286 622L357 694L429 730L500 640L571 748L643 865L714 676L786 748L857 649L929 685L1000 712L1071 703L1143 631L1214 667L1286 622L1357 487L1429 595L1500 730L1500 692L1429 521L1357 413L1286 557L1214 620L1143 629L1071 701L1000 665L929 683L857 611L786 719L714 647L643 809L571 692L500 593L429 710L357 692L286 539L214 413L143 566L71 791L0 791Z"
                fill="#27331e"
              ></path>
              <path
                d="M0 802L71 829L143 676L214 631L286 685L357 748L429 730L500 757L571 865L643 892L714 784L786 766L857 748L929 829L1000 820L1071 802L1143 640L1214 775L1286 694L1357 541L1429 613L1500 865L1500 728L1429 593L1357 485L1286 620L1214 665L1143 629L1071 701L1000 710L929 683L857 647L786 746L714 674L643 863L571 746L500 638L429 728L357 692L286 620L214 467L143 566L71 827L0 800Z"
                fill="#1d2716"
              ></path>
              <path
                d="M0 901L71 901L143 901L214 901L286 901L357 901L429 901L500 901L571 901L643 901L714 901L786 901L857 901L929 901L1000 901L1071 901L1143 901L1214 901L1286 901L1357 901L1429 901L1500 901L1500 863L1429 611L1357 539L1286 692L1214 773L1143 638L1071 800L1000 818L929 827L857 746L786 764L714 782L643 890L571 863L500 755L429 728L357 746L286 683L214 629L143 674L71 827L0 800Z"
                fill="#151c0e"
              ></path>
            </svg>
          </div>

          <div
            className="text-[1rem] p-5 md:p-10 w-full
            rounded-bl-lg rounded-br-lg
            md:rounded-bl-none md:rounded-tr-lg
            bg-black border-gray border-r border-t border-b "
          >
            <h2 className="pb-4 text-xl text-white flex gap-2 items-center">
              <FaUser size={14} />
              Login
            </h2>

            <div className="mb-3">
              <label className="text-gray-400 text-sm flex items-center gap-1 pl-1">
                <MdEmail />
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your email"
                className="bg-gray-300 p-2 mt-1 text-gray rounded-2xl w-full outline-0
                  focus:outline-[#476e1e] focus:outline-4 transition-all delay-75 text-[0.9rem] md:text-[1rem]"
              />
            </div>

            <div className="mb-4">
              <label className="text-gray-400 text-sm flex items-center gap-1 pl-1">
                <RiLockPasswordFill />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="enter your password"
                className="bg-gray-300 p-2 mt-1 text-gray-900 rounded-2xl w-full outline-0
                  focus:outline-[#476e1e] focus:outline-4 transition-all delay-75 text-[0.9rem] md:text-[1rem]"
              />
            </div>

            <button
              type="button"
              className="bg-hover py-2 text-black rounded-2xl w-full
              text-sm md:text-base opacity-80 hover:opacity-100 
              transition-all  delay-150 ease-in-out flex items-center gap-2 justify-center cursor-pointer"
            >
              <IoLogIn size={18} />
              Login
            </button>

            <p className="text-sm md:text-base text-center mt-3 text-white">
              Not created an account yet?{" "}
              <span className="underline cursor-pointer hover:text-hover transition-colors">
                <Link href="/signup">Create account</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
