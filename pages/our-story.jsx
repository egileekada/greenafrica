import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import BaseLayout from "layouts/Base";

import { getPageBySlug } from "../services";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["our_story", "our-story"], () =>
    getPageBySlug("our-story")
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Index = () => {
  const { data } = useQuery(["our_story", "our-story"], () =>
    getPageBySlug("our-story")
  );
  return (
    <BaseLayout>
      <section className="w-full px-3.5 py-14 lg:fit-x-bleed support-docs">
        <div>
          <div
            className="blog_post"
            dangerouslySetInnerHTML={{
              __html: `${data?.data?.item.body}`,
            }}
          ></div>
        </div>

        <div className="hidden">
          <h1>Our Story</h1>

          <p>
            Green Africa is a value airline based in Lagos, Nigeria. We are a
            new carrier that offers safe, reliable and affordable air travel to
            a much broader group of customers. This positions us as a
            significant contributor to the economic development of Nigeria and
            the African continent.
          </p>

          <h5>How It Started</h5>

          <p>
            Growing up in Ile-Ife, Osun State, Babawande Afolabi was always
            fascinated by transportation. The journey to where we are today
            started in 2011/2012 when Babawande was an Investment Banker at
            Morgan Stanley where he had an exposure to the transportation
            sector. This experience further galvanized his interest in the
            space, which led to the idea of exploring a Pan African value
            carrier based in Nigeria. He wanted everyone, including his teachers
            at Ambassadors College, Ile-Ife, to be able to hop on a plane at an
            affordable fare and chase their dreams. In view of this idea, he
            dedicated his time as an MBA at Stanford GSB to learning more about
            the airline industry and took up a Summer Associate role at American
            Airlines in Dallas, TX.
          </p>
          <h5>Taking Actions</h5>
          <p>
            During his time at Stanford, he had the opportunity to spend time
            with some of his professors in the industry including, Prof. George
            Parker, former Board Member, United Airlines, Prof. Joel Peterson,
            Former Chairman, JetBlue Airways and an alumnus, William Shaw,
            Founder and Former CEO of Viva Columbia. As an associate at American
            Airlines, he was introduced to Thomas Horton, Former Chairman & CEO
            and Virasb Vahidi, Former CCO of American Airlines Group. All of
            these senior industry leaders supported Babawande in bringing his
            vision to life with William Shaw, Thomas Horton, and Virasb Vahidi
            later becoming early investors and founding members of the Board of
            Directors.
          </p>

          <p>
            December 2013, Babawande sent a cold email to Oby Ezekwesili, former
            World Bank Vice President for Africa. Surprisingly, she responded
            and became the first senior leader in Nigeria to believe and throw
            her weight behind the vision of a new value airline in the country.
            During the same period, he came up with the name for the airline –
            Green Africa Airways while celebrating the holiday with his family
            in Ile-Ife, Nigeria.
          </p>
        </div>
      </section>
    </BaseLayout>
  );
};

export default Index;
