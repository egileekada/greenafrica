/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";
import CallIcon from "assets/svgs/Call.svg";
import ContactCard from "components/Cards/Contact";
import Newsletter from "components/Newsletter";

import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { getContacts } from "../services";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["contacts"], getContacts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const ContactPage = () => {
  const { data, isLoading, isFetching } = useQuery(["contacts"], getContacts, {
    refetchOnWindowFocus: false,
  });

  const info = {
    title: "gCare Contact Center",
    handle: "0700-GREEN-AFRICA",
    number: "(0700-47336-237422)",
    Component: CallIcon,
  };
  console.log(data);
  return (
    <BaseLayout>
      <section className="w-full fit-x-bleed py-14">
        <h2 className="header-text">Contact Us</h2>

        <section className="contact__cards">
          {data?.data?.items.map((contact) => (
            <ContactCard info={contact} Component={CallIcon} />
          ))}
          {/* <ContactCard info={info} />
          <ContactCard info={info} />
          <ContactCard info={info} /> */}
        </section>
        <Newsletter />
      </section>
    </BaseLayout>
  );
};

export default ContactPage;
