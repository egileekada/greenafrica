import MailIcon from "assets/svgs/mail.svg";
import { useState } from "react";
import { newsletterRequest } from "services/general";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [_loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.length > 0) {
      try {
        setLoading(true);
        const payload = {
          name: "Aero user",
          email,
        };
        await newsletterRequest(payload);
        toast.success("Newsletter Registration Succesful");
        setEmail("");
        setLoading(false);
      } catch (err) {
        toast.error("Newsletter Registration Failed");
        setLoading(false);
      }
    } else {
      toast.error("Email is Required");
    }
  };

  return (
    <section className="flex flex-col md:justify-center md:items-center mx-6 my-16 md:m-70 px-8 py-16 md:p-70 bg-grey-fa relative rounded-xl">
      <h6 className="text-caption">Subscribe To Stay Updated</h6>
      <h2 className="text-title text-[#070808]">Newsletter</h2>
      <form onSubmit={handleSubmit} className="newsletter--form">
        <div className="form-group">
          <label>
            <MailIcon />
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-orange">
          {_loading ? "Subscribing....." : "Subscribe"}
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
