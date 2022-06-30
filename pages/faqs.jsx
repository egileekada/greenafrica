/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";
import Newsletter from "components/Newsletter";
import Accordion from "components/Accordion";

const FaPage = () => {
  const FAQS = [
    {
      question: "How can I book with Green Africa?",
      answer: `Book your next flight or Getaway with Green Africa - online at greenafrica.com.
      You may also contact our gCare center on 0700-GREEN-AFRICA (0700-47336-237422) we would be happy to help. Please note that a fee of 2,000NGN will be applied.
      Don't see a flight you need? The flights may have been sold out or cancelled for operational reasons. We keep releasing our upcoming flight schedules periodically. All current times and routes are up to date and looking great!`,
      category: "booking",
    },
    {
      question: "How can I book a return trip with Green Africa?",
      answer: `Book your next flight or Getaway with Green Africa - online at greenafrica.com.
      You may also contact our gCare center on 0700-GREEN-AFRICA (0700-47336-237422) we would be happy to help. Please note that a fee of 2,000NGN will be applied.
      Don't see a flight you need? The flights may have been sold out or cancelled for operational reasons. We keep releasing our upcoming flight schedules periodically. All current times and routes are up to date and looking great!`,
      category: "booking",
    },
    {
      question: "45 How can I book with Green Africa?",
      answer: `3 Book your next flight or Getaway with Green Africa - online at greenafrica.com.
      You may also contact our gCare center on 0700-GREEN-AFRICA (0700-47336-237422) we would be happy to help. Please note that a fee of 2,000NGN will be applied.
      Don't see a flight you need? The flights may have been sold out or cancelled for operational reasons. We keep releasing our upcoming flight schedules periodically. All current times and routes are up to date and looking great!`,
      category: "booking",
    },
    {
      question: "3 How can I book a return trip with Green Africa?",
      answer: `4 Book your next flight or Getaway with Green Africa - online at greenafrica.com.
      You may also contact our gCare center on 0700-GREEN-AFRICA (0700-47336-237422) we would be happy to help. Please note that a fee of 2,000NGN will be applied.
      Don't see a flight you need? The flights may have been sold out or cancelled for operational reasons. We keep releasing our upcoming flight schedules periodically. All current times and routes are up to date and looking great!`,
      category: "booking",
    },
  ];

  return (
    <BaseLayout>
      <section className="w-full fit-x-bleed py-14">
        <h2 className="header-text">FAQS</h2>

        <section className="flex flex-col ">
          <section className="faqs__tabs my-6">
            <button className="btn btn-primary active mr-4">
              Booking A Flight
            </button>
            <button className="btn btn-outline mr-4">Baggage</button>
            <button className="btn btn-outline ">
              Flight changes and cancellations
            </button>
          </section>

          {/* <Input Field/> */}

          <>
            {FAQS.length > 0 ? (
              FAQS.map((item) => {
                return <Accordion key={item?.question} item={item} />;
              })
            ) : (
              <p>No faqs yet</p>
            )}
          </>
        </section>

        <Newsletter />
      </section>
    </BaseLayout>
  );
};

export default FaPage;
