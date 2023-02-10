import Link from "next/link";
import { technologyType } from "schemas/schema_types";
import SanityImage from "./SanityImage";

export default function TechLogo({
  name,
  logo_image,
  tech_page,
}: technologyType) {
  return (
    <div>
      <Link href={tech_page}>
        <h4>{name}</h4>
        <SanityImage
          sanitySrc={logo_image}
          height={50}
          width={50}
          alt={"logo of " + name}
        />
      </Link>
    </div>
  );
}
