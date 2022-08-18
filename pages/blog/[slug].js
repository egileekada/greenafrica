import BaseLayout from "layouts/Base";
import Newsletter from "components/Newsletter";

const Blog = () => {
  return (
    <BaseLayout>
      <section className="w-full px-3.5 py-10 lg:fit-x-bleed bg-primary-main">
        <div className="md:w-2/4">
          <div className="rounded-lg px-3 py-2 bg-white inline mt-4">
            <span className="uppercase font-semibold">AUGust 13, 2021 </span>
          </div>
          <h1 className="text-white font-semibold text-3xl my-8">
            COVID 19 Guidelines for all passengers flying on Green Africa
          </h1>

          <div className="flex gap-4">
            <img src="/images/facebook.svg" alt="" />
            <img src="/images/twitter.svg" alt="" />
          </div>
        </div>
      </section>
      <img src="/images/blog_wide.jpg" alt="" className="object-cover w-full" />
      <section className="w-full px-3.5 py-10 lg:fit-x-bleed font-light">
        <div className="lg:w-4/6 mx-auto">

        {/* <div
              className="blog_post"
              dangerouslySetInnerHTML={{
                __html: `${props.data.contentfulBlog.body.childMarkdownRemark.html}`,
              }}
            ></div> */}

          <p>
            Design comps, layouts, wireframes—will your clients accept that you
            go about things the facile way? Authorities in our business will
            tell in no uncertain terms that Lorem Ipsum is that huge, huge no no
            to forswear forever.{" "}
          </p>

          <p>
            Not so fast, I'd say, there are some redeeming factors in favor of
            greeking text, as its use is merely the symptom of a worse problem
            to take into consideration.
          </p>

          <p>
            The toppings you may chose for that TV dinner pizza slice when you
            forgot to shop for foods, the paint you may slap on your face to
            impress the new boss is your business. But what about your daily
            bread?
          </p>
        </div>

        <img
          src="/images/blog_wide_2.jpg"
          alt=""
          className="rounded-lg mx-auto my-10"
        />

        <div className="lg:w-4/6 mx-auto">
          <p>
            Design comps, layouts, wireframes—will your clients accept that you
            go about things the facile way? Authorities in our business will
            tell in no uncertain terms that Lorem Ipsum is that huge, huge no no
            to forswear forever.{" "}
          </p>

          <p>
            Not so fast, I'd say, there are some redeeming factors in favor of
            greeking text, as its use is merely the symptom of a worse problem
            to take into consideration.
          </p>

          <p>
            The toppings you may chose for that TV dinner pizza slice when you
            forgot to shop for foods, the paint you may slap on your face to
            impress the new boss is your business. But what about your daily
            bread?
          </p>
        </div>
      </section>

      <section className="w-full px-3.5 py-10 lg:fit-x-bleed">
        <Newsletter />
      </section>
    </BaseLayout>
  );
};

export default Blog;
