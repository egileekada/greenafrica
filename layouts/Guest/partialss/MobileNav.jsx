import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import MobileLogo from "assets/svgs/logo-mob.svg";
import CloseIcon from "assets/svgs/close.svg";
import CaretIcon from "assets/svgs/caret.svg";
import { EXPLORE, SERVICES, ABOUT, BOOK } from "utils/menu";
import WhiteRight from "assets/svgs/white-right.svg";

const MobileNav = ({ open, cycleOpen }) => {
  const links = [
    { name: "Aero MRO", to: "/mro", id: 4, ext: false },
    { name: "Training (ATO)", to: "/training", id: 3, ext: false },
    {
      name: "Login",
      to: "/https://book-flyaero.crane.aero/web/MemberLogin.xhtml",
      id: 1,
      ext: true,
    },
    {
      name: "Register",
      to: "https://book-flyaero.crane.aero/web/MemberRegister.xhtml",
      id: 2,
      ext: true,
    },
  ];

  const itemVariants = {
    closed: {
      opacity: 0,
      scale: 0,
    },
    open: { opacity: 1, scale: 1 },
  };

  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  };
  //  <DownOutlined />;
  return (
    <AnimatePresence>
      <motion.section
        initial={{ width: 0 }}
        animate={{
          width: "100%",
        }}
        exit={{
          width: 0,
          transition: { delay: 0.2, duration: 0.3 },
        }}
        className="bg-white fixed top-0 left-0 z-[9000] w-full h-full"
      >
        {open && (
          <>
            <div className="flex items-center justify-between p-8">
              <Link passHref href="/">
                <figure className="flex items-center justify-center basis-[1/4]  cursor-pointer">
                  <MobileLogo />
                </figure>
              </Link>

              <button onClick={cycleOpen}>
                <CloseIcon />
              </button>
            </div>

            <motion.aside
              className="p-8"
              initial={{ width: 0 }}
              animate={{
                width: "100%",
              }}
              exit={{
                width: 0,
                transition: { delay: 0.1, duration: 0.3 },
              }}
            >
              <motion.div
                initial="closed"
                className="flex flex-col"
                animate="open"
                exit="closed"
                variants={sideVariants}
              >
                <motion.a
                  variants={itemVariants}
                  className="flex flex-col mb-4 relative mobile__nav__dropdown group"
                >
                  <div className="flex items-center">
                    <span
                      className="text-caption font-display 
                                 group-hover:text-primary-main
                                   group-hover:font-bold
                                   mr-4"
                    >
                      Book
                    </span>
                    <CaretIcon />
                  </div>

                  <ul className="flex flex-col ">
                    {BOOK.map((_item) => {
                      return (
                        <li key={_item.link}>
                          <Link href={_item.link}>
                            <a className="text-black hover:text-primary-main flex justify-between items-center">
                              <span className="pr-2">{_item?.name}</span>
                              <WhiteRight />
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </motion.a>

                <motion.a
                  variants={itemVariants}
                  className="flex flex-col mb-4 relative mobile__nav__dropdown group"
                >
                  <div className="flex items-center">
                    <span
                      className="text-caption font-display 
                                 group-hover:text-primary-main
                                   group-hover:font-bold
                                   mr-4"
                    >
                      Explore
                    </span>
                    <CaretIcon />
                  </div>

                  <ul className="flex flex-col ">
                    {EXPLORE.map((_item) => {
                      return (
                        <li key={_item.link}>
                          <Link href={_item.link}>
                            <a className="text-black hover:text-primary-main flex justify-between items-center">
                              <span className="pr-2">{_item?.name}</span>
                              <WhiteRight />
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </motion.a>

                <motion.a
                  variants={itemVariants}
                  className="flex flex-col mb-4 relative mobile__nav__dropdown group"
                >
                  <div className="flex items-center">
                    <span
                      className="text-caption font-display 
                                 group-hover:text-primary-main
                                   group-hover:font-bold
                                   mr-4"
                    >
                      Services
                    </span>
                    <CaretIcon />
                  </div>

                  <ul className="flex flex-col ">
                    {SERVICES.map((_item) => {
                      return (
                        <li key={_item.link}>
                          <Link href={_item.link}>
                            <a className="text-black hover:text-primary-main flex justify-between items-center">
                              <span className="pr-2">{_item?.name}</span>
                              <WhiteRight />
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </motion.a>

                <motion.a
                  variants={itemVariants}
                  className="flex flex-col mb-4 relative mobile__nav__dropdown group"
                >
                  <div className="flex items-center">
                    <span
                      className="text-caption font-display 
                                 group-hover:text-primary-main
                                   group-hover:font-bold
                                   mr-4"
                    >
                      About
                    </span>
                    <CaretIcon />
                  </div>

                  <ul className="flex flex-col ">
                    {ABOUT.map((_item) => {
                      return (
                        <li key={_item.link}>
                          <Link href={_item.link}>
                            <a className="text-black hover:text-primary-main flex justify-between items-center">
                              <span className="pr-2">{_item?.name}</span>
                              <WhiteRight />
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </motion.a>

                {links.map(({ name, to, id, ext }) =>
                  ext ? (
                    <motion.a
                      key={id}
                      rel="noreferrer noopener"
                      target="_blank"
                      href={to}
                      variants={itemVariants}
                      className="flex items-center mb-4"
                    >
                      <span className="text-caption font-display hover:text-primary-main hover:font-bold mr-4 ">
                        {name}
                      </span>
                    </motion.a>
                  ) : (
                    <Link href={to} key={id} passHref>
                      <motion.a
                        variants={itemVariants}
                        className="flex items-center mb-4"
                      >
                        <span className="text-caption font-display hover:text-primary-main hover:font-bold mr-4 ">
                          {name}
                        </span>
                      </motion.a>
                    </Link>
                  )
                )}
              </motion.div>
            </motion.aside>
          </>
        )}
      </motion.section>
    </AnimatePresence>
  );
};

export default MobileNav;
