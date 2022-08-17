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
  const { data } = useQuery(["contacts"], getContacts, {
    refetchOnWindowFocus: false,
  });

  return (
    <BaseLayout>
      <section className="w-full fit-x-bleed py-14">
        <h2 className="header-text">Contact Us</h2>

        <section className="contact__cards">
          {data?.data?.items.map((contact) => (
            <ContactCard info={contact} Component={CallIcon} />
          ))}
        </section>
        <Newsletter />
      </section>
    </BaseLayout>
  );
};

export default ContactPage;
