/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import BaseLayout from "layouts/Base";
import { getPageBySlug } from "../services";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["privacy_policy", "privacy-policy"], () =>
    getPageBySlug("privacy-policy")
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}


const Home = () => {
  const { data } = useQuery(["privacy_policy", "privacy-policy"], () =>
    getPageBySlug("privacy-policy")
  );

  return (
    <>
      <Head>
        <title>
          Privacy Policy — One flight closer to your dreams and destinations.
        </title>
        <meta
          name="title"
          content="Privacy Policy — One flight closer to your dreams and destinations."
          key="title"
        />
        <meta
          property="og:title"
          content="Privacy Policy — One flight closer to your dreams and destinations."
          key="ogTitle"
        />
        <meta
          property="twitter:title"
          content="Privacy Policy — One flight closer to your dreams and destinations."
          key="twitterTitle"
        />
      </Head>

      <BaseLayout>
        <section className="w-full px-3.5 py-14 lg:fit-x-bleed support-docs">
          <div>
            <div
              className="story__post privacy_page"
              dangerouslySetInnerHTML={{
                __html: `${data?.data?.item.body}`,
              }}
            ></div>
          </div>

          <div className="hidden">
            <h1>Privacy Policy</h1>

            <h5 className="context-h3 text-primary context-h4">
              <strong>INTRODUCTION</strong>
            </h5>
            <p>
              By accessing or visiting our website [*] (the "Website"), our
              mobile application (both Website and mobile appl hereinafter
              referred to as “Platforms”) and more generally, use any of our
              services (the "Services", which include the Platforms), you agree
              on behalf of yourself and any organization that you represent
              (together, “you”, “your” or “User”) that you have read and
              understood this Privacy Policy (the “Policy”) and that you consent
              to the collection, use, and sharing of information as discussed
              below.
            </p>

            <h5 className="context-h4 text-primary">
              <strong>1. PERSONAL INFORMATION WE COLLECT</strong>
            </h5>

            <p>
              Green Africa collects and maintains personal information about you
              from many sources to understand and meet your needs. when you
              register on the Platforms, express an interest in obtaining
              information about us or our Services, when you participate in
              activities on the Platforms or otherwise when you contact us, we
              collect information across three cardinal points:
            </p>
            <p>
              <strong>a)</strong> Personally Identifiable Information (PII)
              voluntarily provided by you;
            </p>
            <p>
              <strong>b)</strong> Information provided by a third-party for the
              purpose of verifying and/or augmenting a User’s PII; and
            </p>
            <p>
              <strong>c)</strong> Information automatically provided as a result
              of User’s engagement with our platform (terms of use are contained
              in our Cookie Policy)
            </p>
            <p>
              Personal Information we collect includes but is not limited to:
            </p>
            <p>
              <strong>a)</strong> Full name, physical residential address,
              nationality, telephone number and email address;&nbsp;
            </p>
            <p>
              <strong>b)</strong> Date of birth, marital status and
              gender;&nbsp;
            </p>
            <p>
              <strong>c)</strong> Bank account number, credit or debit card
              details and billing address;&nbsp;
            </p>
            <p>
              <strong>d)</strong> Photographic Identification, which includes
              but is not limited to international passport details and driver’s
              license;&nbsp;
            </p>
            <p>
              <strong>e)</strong> Corporate address, tax identification number
              and employer contact information; and&nbsp;
            </p>
            <p>
              <strong>f)</strong> Other technical information like user IP
              address, browser type and internet service provider
            </p>
            <p>&nbsp;</p>
            <p>
              All personal information that you provide to us must be true,
              complete and accurate, and you must notify us of any changes to
              such personal information. Also, we collect information through
              cookies and similar technologies like many other businesses.
            </p>

            <h5 className="context-h4 text-primary">
              <strong>2. PURPOSE OF COLLECTION</strong>
            </h5>

            <p>
              Green Africa collects Users’ personal information to provide an
              efficient and secure User experience and may retain such personal
              data for the period necessary to fulfil the purposes outlined in
              this Policy unless a longer retention period is required or
              permitted by law. In accordance with relevant laws, We may collect
              or process your information on the following legal basis:
            </p>
            <ul>
              <li>
                <strong>Consent</strong>: We may process your information if you
                have given us specific consent to use your personal information
                for a specific purpose.
              </li>
            </ul>
            <p>&nbsp;</p>
            <ul>
              <li>
                <strong>Legitimate Interests:</strong> We may process your
                information when it is reasonably necessary to achieve our
                legitimate business interests.
              </li>
            </ul>
            <p>&nbsp;</p>
            <ul>
              <li>
                <strong>Performance of a Contrac</strong>t: Where we have
                entered into a contract with you, we may process your personal
                information to fulfill the terms of our contract.
              </li>
            </ul>
            <p>&nbsp;</p>
            <ul>
              <li>
                <strong>Legal Obligations:</strong> We may disclose your
                information where we are legally required to do so in order to
                comply with applicable law, governmental requests, a judicial
                proceeding, court order, or legal process, such as in response
                to a court order or a subpoena (including in response to public
                authorities to meet national security or law enforcement
                requirements).
              </li>
            </ul>
            <p>&nbsp;</p>
            <ul>
              <li>
                <strong>Vital Interests:</strong> We may disclose your
                information where we believe it is necessary to investigate,
                prevent, or take action regarding potential violations of our
                policies, suspected fraud, situations involving potential
                threats to the safety of any person and illegal activities, or
                as evidence in litigation in which we are involved.
              </li>
            </ul>
            <p>
              More specifically, Information gathered on the Platforms form each
              User may be used to:
            </p>
            <p>
              <strong>a)</strong> fulfill legal and contractual obligations to
              Users;
            </p>
            <p>
              <strong>b)</strong> develop, operate, support, maintain enhance
              and provide its services;
            </p>
            <p>
              <strong>c)</strong> process payment transactions;
            </p>
            <p>
              <strong>d)</strong> provide receipts and reports on User’s
              account;
            </p>
            <p>
              <strong>e)</strong> resolve disputes arising from using our
              Platforms;
            </p>
            <p>
              <strong>f)</strong> customize measure, and improve the Services
              offered on our Platforms;
            </p>
            <p>
              <strong>g)</strong> protect the interests and rights of our
              Platform;
            </p>
            <p>
              <strong>h)</strong> protect the health and safety of our employees
              and customers;
            </p>
            <p>
              <strong>i)</strong> protect our property
            </p>
            <p>
              <strong>j)</strong> enforce our agreements on the Platforms;
            </p>
            <p>
              <strong>k)</strong> detect and prevent fraud and other potentially
              illegal activities;
            </p>
            <p>
              <strong>l)</strong> for administrative, operational and reporting
              purposes;
            </p>
            <p>
              <strong>m)</strong> promote marketing communication (taking into
              consideration the option to opt out);
            </p>
            <p>
              <strong>n)</strong> manage and protect the Platforms’ information
              technology and physical infrastructure; and
            </p>
            <p>
              <strong>o)</strong> measure the performance of the Platforms and
              improve content, technology and layout
            </p>

            <h5 className="context-h4 text-primary">
              <strong>3. DATA SUBJECT CONSENT</strong>
            </h5>

            <p>
              <strong>3.1</strong> Generally, we rely on your clear, unequivocal
              and comprehensible consent as the legal basis for processing your
              data. This covers cases where you require us to process your data
              for the purpose of performing a contract with you, or accessing
              our services, raising a complaint for clearance of faults;
              whistleblowing; accessing any of our customer care services; or
              for use in our marketing and advertising services. In any of the
              foregoing instances, we will seek your consent before we share
              your personal data with any third party for such purposes.
            </p>
            <p>
              &nbsp;<strong>3.2</strong> With regards to what constitutes data
              subject’s consent, in accordance with the applicable laws and
              regulations, Green Africa shall ensure that consent is freely
              given and is obtained following full disclosure of its intended us
              and without fraud, coercion or undue influence. Since the
              performance of a contract with you and provision of our services
              to you are conditional on your consent, we shall deem that you
              have granted us the free and express consent to collect and
              process your personal data when you fill any of our forms, access
              or create an account on our Platforms, correspond with us by post,
              phone, email as well as other related medium/platforms.
            </p>
            <p>
              <strong>
                PLEASE NOTE THAT YOU HAVE THE RIGHT TO WITHDRAW CONSENT AT ANY
                TIME TO THE PROCESSING OF YOUR PERSONAL DATA BY CONTACTING OUR
                DATA PROTECTION OFFICER (at [*]). Please note however that the
                withdrawal of consent will not affect the lawfulness of the
                processing before its withdrawal, nor will it affect the
                processing of your personal information conducted in reliance on
                lawful processing grounds other than consent.
              </strong>
            </p>
            <p>
              <span>
                <strong>3.3</strong> Where we need to collect personal data by
                law, or under the terms of a contract we have with you, or to
                provide our products and our services and you fail to provide
                that data when requested, we may not be able to perform the
                contract we have or are trying to enter into with you (including
                to provide you with our products and services). In such case, we
                may have to cancel a product or service you have with us but we
                will notify you if this is the case at the time.
              </span>
            </p>

            <h5 className="context-h4 text-primary">
              <strong>4. DATA SUBJECT RIGHT</strong>
            </h5>

            <p>
              Subject to applicable law, regulations and/or guidelines, you may
              have the following rights:
            </p>
            <ul>
              <li>
                <strong>Consent</strong>
              </li>
            </ul>
            <p>
              To be informed of and to provide consent prior to the use of your
              personal data for purposes other than that for which it was
              initially collected
            </p>
            <ul>
              <li>
                <strong>Access</strong>
              </li>
            </ul>
            <p>
              To request a copy of the personal data processed in relation to
              you. Please note that we may, by law, charge a fee for this.
            </p>
            <ul>
              <li>
                <strong>Correction</strong>
              </li>
            </ul>
            <p>
              To request that we correct your personal data found by you to be
              incorrect or to have changed.
            </p>
            <ul>
              <li>
                <strong>Erasure</strong>
              </li>
            </ul>
            <p>
              To ask us to delete your personal data, for example if we no
              longer have a valid reason to process it.
            </p>
            <ul>
              <li>
                <strong>Object</strong>
              </li>
            </ul>
            <p>
              To object to how we process your personal data. This does not mean
              you can decide or choose how we process your personal data other
              than in relation to marketing. If you have any concerns about how
              we process your personal data, please contact us at [*]. Please
              note that we may not be able to offer you services if you do not
              want us to process the personal data which we consider necessary
              for the provision of that services.
            </p>
            <ul>
              <li>
                <strong>Portability of data</strong>
              </li>
            </ul>
            <p>To request the movement of data from us to a third Party.</p>

            <h5 className="context-h4 text-primary">
              <strong>5. SHARING INFORMATION WITH THIRD PARTIES</strong>
            </h5>

            <p>
              <strong>5.1</strong> We may share your information with
              third-party service providers for the purpose of validating your
              credentials; securing data storage, marketing, advertising,
              customer service, and other applicable services and we require
              that these third-party providers use Personal Data only in
              connection with the services they perform for Green Africa.
            </p>
            <p>
              &nbsp;<strong>5.2</strong> Third parties to whom Green Africa
              outsources all or part of personal data processing activities must
              also comply with this Policy. We will validate the privacy policy
              of any new third-party with whom we engage, that requires us
              providing personal data of Users, Merchants, employees and others.
              Existing third-party service providers will also be subject to
              validation.
            </p>
            <p>
              <strong>5.3</strong> We may share Users’ non-personally
              identifiable information with third parties that help us better
              understand how Users use our Service, or help us detect and
              prevent fraud and other unauthorized or suspicious activity. These
              third-parties may use cookies and other technologies to collect
              non-personally identifiable information about Users and combine it
              with similar information collected from others. They may use this
              information to help us better understand our Users, and to help
              their other customers better understand the Users.
            </p>
            <p>
              <strong>5.4</strong> Green Africa may share User information in
              the event of a merger, acquisition, debt financing, sale of all or
              a portion of our assets, or similar transaction, or in the event
              of insolvency, bankruptcy or receivership in which User
              information is transferred to one or more third parties as one of
              our business assets. Should such an event occur, Green Africa will
              endeavor to ensure that the acquirer, successor, or assignee (as
              the case may be) follows this Privacy Policy with respect to User
              information. If User information could be used contrary to this
              Privacy Policy, Users will receive prior notice as well as the
              opportunity to opt out.
            </p>
            <p>
              <strong>5.5</strong> Green Africa may share User information with
              law enforcement, government officials, or other third parties in
              the event of a subpoena, court order or similar legal procedure,
              or when Green Africa believes in good faith that the disclosure of
              User information is necessary or advisable to report suspected
              illegal activity, or to protect Green Africa’s property or legal
              rights or the property or rights of others, or otherwise to help
              protect the safety or security of the Services.
            </p>
            <p>
              <strong>5.6</strong> Except as expressly disclosed in this Privacy
              Policy, Green Africa will not sell or disclose Users’ information
              to third parties. Green Africa will not sell, rent, share, or
              trade PII to third parties (other than the Platforms through which
              Green Africa collected such information) for their promotional
              purposes.
            </p>
            <p>
              <strong>5.7</strong> We may share personally identifiable
              information with third parties for the purposes set out in Section
              2 of this Policy above, and in compliance with the applicable laws
              and regulations. We may also share non-identifiable information
              with third parties that help us prevent fraud and analyze website
              activity.
            </p>

            <h5 className="context-h4 text-primary">
              <strong>6. RETENTION POLICY</strong>
            </h5>

            <p>
              <strong>6.1</strong> We will only retain your personal data for as
              long as reasonably necessary to fulfill the purposes for which we
              collected it, including the satisfaction of any legal, regulatory,
              tax, accounting or reporting requirements. We may retain your
              personal data for a longer period if required by applicable law,
              in the event of a complaint or if we reasonably believe there is a
              prospect of litigation in respect to our relationship with you.
            </p>
            <p>
              <strong>6.2</strong> To determine the appropriate retention period
              for personal data, we consider the amount, nature and sensitivity
              of the personal data, the potential risk of harm from unauthorised
              use or disclosure of your personal data, the purposes for which we
              process your personal data and whether we can achieve those
              purposes through other means, and the applicable legal,
              regulatory, tax, accounting or other requirements
            </p>

            <h5 className="context-h4 text-primary">
              <strong>7. GOVERNING PRINCIPLES</strong>
            </h5>

            <p>
              Green Africa will comply with the principles outlined below for
              the purpose of collecting, storing and using a User’s personal
              information.
            </p>
            <p>
              <strong>a)</strong> Data shall be collected and processed with a
              specific, legitimate and lawful purpose which shall be consented
              to by the User before collection and processing;
            </p>
            <p>
              <strong>b)</strong> Data may be further processed for archiving,
              scientific research, historical research and statistical purposes
              for public interest without the obtaining the consent of the User;
            </p>
            <p>
              <strong>c)</strong> Data collection and processing shall be
              adequate, accurate and with consideration for dignity of human
              person;
            </p>
            <p>
              <strong>d)</strong> Data shall only be stored for the period which
              is reasonably needed and as required by any written law; and
            </p>
            <p>
              <strong>e)</strong> Data shall be secured against all foreseeable
              hazards and breaches such as theft, cyberattack, viral attack,
              dissemination, manipulations of any kind, damage by rain, fire or
              exposure to other natural elements.
            </p>

            <h5 className="context-h4 text-primary">
              <strong>8. REPORTING PERSONAL DATA BREACH</strong>
            </h5>

            <p>
              <strong>8.1</strong> Green Africa is required to comply with the
              Nigeria Data Protection Regulation 2019 (“NDPR”) and other
              relevant regulations regarding reporting requirements in relation
              to data breaches and report any personal data breach. Green Africa
              has a duty to report to NITDA within 72 hours of becoming aware of
              a breach and to notify the User within 7 working days except
              otherwise directed by NITDA. .
            </p>
            <p>
              <strong>8.2</strong> Green Africa has placed procedures around its
              Platforms to deal with any suspected personal data breach and will
              notify a User or NITDA (where legally required to do so). Any
              suspected breach of personal data of a User will be remedied
              within one (1) month from the date of the report of the breach.
            </p>
            <p>
              <strong>8.3</strong> All evidence relating to a personal data
              breach should be preserved to enable Green Africa to maintain a
              record of such breaches, as required by the data protection laws
              and to preclude future recurrence.
            </p>
            <p>
              <strong>8.4</strong> Green Africa will not be responsible for any
              personal data breach which occurs as a result of:
            </p>
            <p>
              <strong>a)</strong> an event which is beyond its control;
            </p>
            <p>
              <strong>b)</strong> an act or threats of terrorism;
            </p>
            <p>
              <strong>c)</strong> an act of God (such as, but not limited to
              pandemics, fires, explosions, earthquakes, drought, tidal waves
              and floods);
            </p>
            <p>
              <strong>d)</strong> war, hostilities (whether war be declared or
              not), invasion, act of foreign enemies, mobilisation, requisition,
              or embargo;
            </p>
            <p>
              <strong>e)</strong> rebellion, revolution, insurrection, or
              military or usurped power, or civil war which compromises the data
              protection measures on Green Africa’s Platform;
            </p>
            <p>
              <strong>f)</strong> the transfer of a User’s personal data to a
              third party on his/her instructions; and
            </p>
            <p>
              <strong>g)</strong> the use of a User’s personal data by a third
              party designated by a User.
            </p>

            <h5 className="context-h4 text-primary">
              <strong>9. POLICY UPDATES</strong>
            </h5>

            <p>
              <span>
                This Policy may be updated from time to time and we shall notify
                you of any changes thereon via a notice on our website. It is
                also important that the personal data we hold about you is
                accurate and current. In view of this, we encourage you to
                always update your personal data and keep us informed if there
                are changes to your personal data during your relationship with
                us.
              </span>
            </p>

            <h5 className="context-h4 text-primary">
              <strong>10. DATA PROTECTION OFFICER</strong>
            </h5>

            <p>
              <strong>10.1</strong> To ensure that any concerns you may have
              regarding the protection of your personal data is addressed
              sufficiently and timeously, we have appointed a Data Protection
              Officer (DPO) who is responsible for overseeing questions in
              relation to this Policy.
            </p>
            <p>
              <strong>10.2</strong> Without prejudice to any other provisions of
              this Policy, if you have any questions about this Policy or our
              privacy practices, including any requests to exercise your legal
              rights which have been specified in this Policy, please contact
              the DPO at [*]:
            </p>
            <p>
              <strong>10.3</strong> Without prejudice to your right to make a
              complaint at any time to the NITDA, the supervisory authority for
              data protection issues (www.nitda.gov.ng) for any alleged breach
              of your data privacy rights, we would appreciate that you contact
              us in the first instance through the DPO if you have any concerns
              regarding the protection of your data or this Policy.
            </p>

            <h5 className="context-h4 text-primary">
              <strong>11. GOVERNING LAW</strong>
            </h5>

            <p>
              <span>
                This Policy is made pursuant to the provisions of the NDPR and
                any other relevant Nigerian laws, regulations, or international
                conventions applicable to Nigeria
              </span>
            </p>

            <h5 className="context-h4 text-primary">
              <span>
                <strong>CONSENT CLAUSE</strong>
              </span>
            </h5>

            <p>
              <span>
                In accordance with the provisions of the Nigerian Data
                Protection Regulations that consent must be a freely given,
                specific, informed and unambiguous indication of a Data
                Subject's agreement to the processing of his/her Personal Data,
                I hereby confirm that I have read the foregoing policy and with
                a clear understanding of its implications as regards my privacy
                rights consent to the processing of my personal data by Green
                Africa
              </span>
            </p>
          </div>
        </section>
      </BaseLayout>
    </>
  );
};

export default Home;
