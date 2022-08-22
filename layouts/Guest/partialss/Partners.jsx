/* eslint-disable @next/next/no-img-element */
const Partners = () => {
  return (
    <section className="partners">
      <h2 className="text-title text-[#070808]">Payment Partners</h2>
      <div className="flex flex-wrap">
        <figure>
          <img src="/images/quickteller.png" alt="quickteller" />
        </figure>
        <figure>
          <img src="/images/paystack.png" alt="paystack" />
        </figure>
        <figure>
          <img src="/images/gtbank.png" alt="gtbank" />
        </figure>

        <figure>
          <img src="/images/unifiedpayment.jpeg" alt="unifiedpayment" />
        </figure>
      </div>
    </section>
  );
};

export default Partners;
