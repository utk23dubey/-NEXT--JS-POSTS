import logo from "@/assets/logo.png";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header id="main-header">
      <Link href="/">
        <Image
          src={logo}
          alt="Mobile phone with posts feed on it"
          width={100} // override width and height attribute
          height={100}
          //sizes="10vw" // this is recommended way so resize the image according to the view port
          priority // this tells NEXT-JS not to lazy load as this will required in every screen
        />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/feed">Feed</Link>
          </li>
          <li>
            <Link className="cta-link" href="/new-post">
              New Post
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
