import React from "react";
// import styles from "./logo.module.css";
import Image from "next/image";
import { MarbleSticker } from "../../../public/img";
import Link from "next/link";

type LogoProps = {
    classStyle?: string;

    style?: React.CSSProperties;
};
const Logo: React.FC<LogoProps> = ({ classStyle = "", style }) => {
    return (
        // <div style={style}>
        <i className={`logo ${classStyle}`} style={style}>
            <Link href="/">
                <span>

                    <Image
                        src={MarbleSticker}
                        width={50}
                        height={50}
                        alt=""
                        priority
                    // className={styles.logo_image}
                    />
                </span>
                {/* <Image
          src={img.MarbleSticker}
          width={100}
          height={100}
          alt=""
          className={styles.logo_image}
        /> */}
            </Link>
        </i>
        // </div>
    );
};

export default Logo;
