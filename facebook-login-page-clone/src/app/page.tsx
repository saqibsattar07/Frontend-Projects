import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      {/* Left Side */}
      <div className="text-3xl w-1/2 px-10 -mt-3">
        <Image
          src={"/images/facebook.svg"}
          width={300}
          height={100}
          alt="Facebook Logo"
        ></Image>
        <p className="ml-8">
          Facebook helps you connect and share with the people in your life.
        </p>
      </div>

      {/* Right Side */}
      <div className="bg-white flex flex-col p-5 rounded- w-1/3">
        <input
          className="my-2 border border-1 border-gray-100 p-3 rounded-md focus:outline-1 outline-blue-600"
          type="text"
          placeholder="Email address or phone number"
        />
        <input
          className="my-2  border border-1 border-gray-100 p-3 rounded-md focus:outline-1 outline-blue-600"
          type="password"
          placeholder="Password"
        />
        <button className="bg-blue-600 text-white my-2 py-2 text-lg font-bold rounded-md hover:bg-blue-700">
          Log in
        </button>
        <p className="cursor-pointer text-blue-600 text-sm my-2 text-center hover:underline">
          Forgotten password?
        </p>
        <span className="my-2">
          <hr />
        </span>
        <button className="bg-green-500 text-white my-2 py-2 px-2 text-lg font-bold rounded-md hover:bg-green-600 w-fit mx-auto">
          Create new account
        </button>
      </div>
    </div>
  );
}
