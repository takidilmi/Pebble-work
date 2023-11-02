import Image from "next/image";
import React from "react";
import { useTranslation } from "next-i18next";
import styles from "@/styles/about.module.css";
import MembersCard from "@/components/Cards/Aboutus/MembersCard";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const AboutPage = () => {
    const { t } = useTranslation();

    return (
        <>
            <div
                className={`grid grid-rows-1 content-center place-items-center xl:pt-20  lg:pb-[250px] overflow-x-hidden`}
            >
                <div className='absolute xl:static top-0 pb-40'>
                    <Image
                        className={`${styles.topImage} xl:w-[1440px] object-cover xl:object-cover lg:object-cover md:object-cover xl:h-[780px] lg:w-[1233px] lg:h-[630px] md:h-[575px] h-[363px]`}
                        src='/images/AboutPebble.png'
                        alt='Pebbles'
                        width={1440}
                        height={780}
                    />
                </div>
                <div
                    className={`flex flex-col flex-wrap items-center pb-[200px] xl:pb-40 z-[1]`}
                >
                    <h1
                        className={`${styles.text0} ${styles.slideInFromRight1} xl:mb-7`}
                    >
                        {t("about:about.title")}
                    </h1>
                    <p
                        className={`${styles.text1} ${styles.slideInFromRight1} flex text-center text-[#878787] px-4`}
                    >

                        Experience the power of PebbleWork with its cutting-edge
                        technologies. We have crafted a responsive and
                        interactive platform that puts the user as the central
                        piece. Seamlessly navigate through the pages, create,
                        edit and delete events. Join and unjoin with a simple
                        click. PebbleWork brings a platform made by volunteers
                        for volunteers. With secure user authentication and
                        real-time data storage, we offer a user-friendly
                        experience. Whether you&apos;re an event organizer or a
                        participant, PebbleWork is here to simplify your
                        community engagement. Join us today and make a
                        meaningful impact in your community.

                    </p>
                </div>
                <div
                    className={`${styles.teamContainer} rounded-[20px] flex flex-col items-center bg-[#fbc495] bg-opacity-70 xl:mb-40`}
                >
                    <h2
                        className={`${styles.teamText} text-[40px] text-[#1A1A1A] md:mt-10 pt-2 md:mb-10`}
                    >
                        {t("about:about.ourTeam")}
                    </h2>
                    <div className='flex flex-row xl:flex-col flex-wrap gap-10 mx-3 md:mx-10'>
                        <div className='flex flex-col xl:flex-row gap-7 xl:gap-96 flex-wrap'>
                            <MembersCard
                                imageSrc='https://avatars.githubusercontent.com/u/137820288?v=4'
                                name='Halla Hamidi'
                                google='https://mail.google.com/mail/u/0/?fs=1&to=aniabisso.16@gmail.com&tf=cm'
                                linkedin='https://www.linkedin.com/in/halla-hamidi-989197229/'
                                github='https://github.com/Halla24'
                            />

                            <MembersCard
                                imageSrc='https://avatars.githubusercontent.com/u/137835769?v=4'
                                name='Takieddine Dilmi'
                                google='https://mail.google.com/mail/u/0/?fs=1&to=angeldilmi@gmail.com&tf=cm'
                                linkedin='https://www.linkedin.com/in/takidilmi/'
                                github='https://github.com/takidilmi'
                            />
                        </div>

                        <div className='flex flex-col xl:flex-row gap-7 xl:gap-20 justify-center mb-7 xl:mb-20'>
                            <MembersCard
                                imageSrc='https://avatars.githubusercontent.com/u/95043080?v=4'
                                name='Manel H.Haddoud'
                                google='https://mail.google.com/mail/u/0/?fs=1&to=manelhasnahaddoud@gmail.com&tf=cm'
                                linkedin='https://www.linkedin.com/in/manel-hasna-haddoud-aa5095278/'
                                github='https://github.com/hasnahadd'
                            />

                            <MembersCard
                                imageSrc='https://avatars.githubusercontent.com/u/64746106?v=4'
                                name='Youssouf Sergma'
                                google='https://mail.google.com/mail/u/0/?fs=1&to=sergmayoussouf@gmail.com&tf=cm'
                                linkedin='https://www.linkedin.com/in/sergma/'
                                github='https://github.com/ysergma'
                            />
                        </div>
                    </div>
                    <div className='xl:mb-10 md:mb-7 mb-4'>
                        <MembersCard
                            imageSrc='https://avatars.githubusercontent.com/u/138169337?v=4'
                            name='Louisa Hamrit'
                            google='https://mail.google.com/mail/u/0/?fs=1&to=l19.45.127.0@gmail.com&tf=cm'
                            linkedin='https://www.linkedin.com/in/louisa-h-958733294/'
                            github='https://github.com/Polichinell'
                        />
                    </div>
                </div>
                <div
                    id='tech-stack'
                    className={`${styles.slideInFromRight1} flex flex-col items-center text-center xl:mb-40 md:pb-40 pb-[222px]`}
                >
                    <h6 className={`${styles.techText} text-[#1A1A1A] xl:mb-4`}>
                        {t("about:about.techStack")}
                    </h6>
                    <h2
                        className={`${styles.techText1} text-[#878787] xl:mb-4`}
                    >
                        {t("about:about.techStackDescription")}
                    </h2>
                </div>
            </div>
        </>
    );
};

export default AboutPage;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "about"])),
            // Will be passed to the page component as props
        },
    };
}
