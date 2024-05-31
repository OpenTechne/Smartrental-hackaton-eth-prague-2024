import Image from "next/image";
import { Button } from "flowbite-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-white-800 mb-4">
        Welcome to Open Workspaces
      </h1>
      <h2 className="text-4xl font-bold text-white-800 mb-4">
        Decentralized Coworking Spaces Management Platform
      </h2>
      <p className="text-gray-600 mb-6">
        Open Workspaces is the new way to fund and support coworking spaces.
        Join a community of entrepreneurs, freelancers, and remote workers to
        create the perfect workspace together. Own, Rent or Lease a space.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button gradientMonochrome="info">Info</Button>
        <Button gradientMonochrome="success">Success</Button>
        <Button gradientMonochrome="cyan">Cyan</Button>
        <Button gradientMonochrome="teal">Teal</Button>
        <Button gradientMonochrome="lime">Lime</Button>
        <Button gradientMonochrome="failure">Failure</Button>
        <Button gradientMonochrome="pink">Pink</Button>
        <Button gradientMonochrome="purple">Purple</Button>
      </div>
    </main>
  );
}
