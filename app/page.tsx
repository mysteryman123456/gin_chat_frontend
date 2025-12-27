"use client";

import Link from "next/link";

export default function page() {
  return (
    <>
      <h2>Welcome ot home page of gin chat</h2>
      <Link href={"/signup"}>Signup</Link>
    </>
  );
}
