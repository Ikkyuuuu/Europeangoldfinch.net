// src/components/Sidebar.jsx
export default function Sidebar() {
    return (
        <div className="egf-sidecard">
            <div className="egf-sideblock">
                <div className="egf-sidehead">ABOUT THE SITE:</div>
                <p>
                    This site is dedicated to fans of the European Gold Finch (EGF), or
                    <i> Carduelis carduelis</i> as they are known in the scientific community.
                </p>
            </div>

            <div className="egf-sideblock">
                <div className="egf-sidehead">FAQ:</div>
                <p><b>What is a European Gold Finch?</b></p>
                <p>
                    The EGF is a small passerine bird of the finch family. The EGF is
                    approximately <b>11–13.5 cm (4–5 inches) long</b> and
                    <b> weighs 16 to 22 grams</b>. Sexes are alike, with a red face,
                    black and snowy white heads, brown and white breast upperparts and
                    black wings with yellow flares. They are simply beautiful!
                </p>
                <p><i>FOR MORE EGF FACTS, READ THE FAQ HERE!</i></p>
            </div>
        </div>
    );
}
