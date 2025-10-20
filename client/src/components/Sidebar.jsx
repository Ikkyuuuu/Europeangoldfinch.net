// src/components/Sidebar.jsx
export default function Sidebar() {
    return (
        <div className="egf-sidecard">
            {/* ABOUT BLOCK */}
            <div className="egf-sideblock egf-about">
                <div className="egf-sidehead egf-about-head">ABOUT THE SITE:</div>

                <p className="egf-about-s1">
                    This site is dedicated to fans of the <b>European Gold Finch (EGF)</b>, or
                    <i className="egf-about-sci"> Carduelis carduelis</i>
                    <span className="egf-about-s2-tail">
                        {" "}
                        as they are known in the scientific community.
                    </span>
                </p>
            </div>

            {/* FAQ BLOCK */}
            <div className="egf-sideblock egf-faq">
                <div className="egf-sidehead egf-faq-head">FAQ:</div>

                <p className="egf-faq-q">
                    What is a <b>European Gold Finch</b>?
                </p>

                <p className="egf-faq-s1">
                    The <b>EGF</b> is a small passerine bird of the <b>finch family</b>. The EGF is
                    approximately <b>11-13.5 cm (4-5 inches) long</b> and <b>weighs 16 to 22 grams</b>.
                    Sexes are alike, with a red face, black and snowy white heads, brown and white breast
                    upperparts and black wings with yellow flares. They are simply beautiful!
                </p>

                <p className="egf-faq-more">
                    <b>
                        <i>FOR MORE EGF FACTS, READ THE FAQ HERE!</i>
                    </b>
                </p>
            </div>
        </div>
    );
}
