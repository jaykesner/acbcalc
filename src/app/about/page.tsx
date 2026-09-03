import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <h1
        className="text-3xl font-semibold tracking-tight"
        style={{ fontFamily: "var(--font-fraunces), var(--font-display)" }}
      >
        About anticholinergic burden
      </h1>
      <p className="mt-4 text-[var(--ink-muted)]">
        Anticholinergic medicines block acetylcholine and affect smooth muscle in the lungs,
        gastrointestinal tract, and urinary tract. They are used for conditions such as Parkinson’s
        disease, allergies, COPD, depression, and urinary incontinence — and many commonly
        prescribed medicines have anticholinergic properties.
      </p>
      <p className="mt-4 text-[var(--ink-muted)]">
        Adverse effects include dry eyes, urinary retention, dizziness, cognitive impairment, and
        falls. Burden rises with stronger agents and with combinations. Older patients are more
        susceptible because of polypharmacy, reduced drug metabolism, and increased blood–brain
        barrier permeability.
      </p>

      <h2
        className="mt-10 text-2xl font-semibold"
        style={{ fontFamily: "var(--font-fraunces), var(--font-display)" }}
      >
        Why score burden?
      </h2>
      <p className="mt-3 text-[var(--ink-muted)]">
        Anticholinergic burden scales help quantify exposure during medication review. Longitudinal
        studies associate anticholinergic use with cognitive impairment and mortality, and
        cumulative long-term exposure with dementia risk. A total score of 3 or more is treated as
        clinically significant in this tool.
      </p>

      <h2
        className="mt-10 text-2xl font-semibold"
        style={{ fontFamily: "var(--font-fraunces), var(--font-display)" }}
      >
        Methodology
      </h2>
      <p className="mt-3 text-[var(--ink-muted)]">
        Many published scales exist. This calculator combines the Anticholinergic Cognitive Burden
        (ACB) Scale and the German Anticholinergic Burden Scale (GABS), which have comparatively
        strong validity and reliability evidence. Where the two disagree, the higher score is used
        in the interest of safety.
      </p>
      <p className="mt-3 text-[var(--ink-muted)]">
        The score does not incorporate dose. Higher doses still increase clinical risk. If a
        medicine is not listed, treat it as score 0. Many anticholinergic medicines are prescribed
        for good reason — the calculator supports review; it does not mandate deprescribing.
      </p>
      <p className="mt-3">
        <Link href="/">Return to calculator</Link> · <Link href="/reducing">Reducing ACB risk</Link>
      </p>

      <h2
        className="mt-10 text-2xl font-semibold"
        style={{ fontFamily: "var(--font-fraunces), var(--font-display)" }}
      >
        References
      </h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-[var(--ink-muted)]">
        <li>
          Polypharmacy and Medicines Optimisation in Older People. East Cheshire NHS Prescribing
          Commissioning Policy, August 2016.
        </li>
        <li>
          Flacker J, et al. The association of serum anticholinergic activity with delirium in
          elderly patients. Am J Geriatr Psychiatry. 1998;6:31–41.
        </li>
        <li>
          Roe C, Anderson M, Spivack B. Use of anticholinergic medication by older adults with
          dementia. J Am Geriatr Soc. 2002;50:836–842.{" "}
          <a href="https://doi.org/10.1046/j.1532-5415.2002.50208.x">doi:10.1046/j.1532-5415.2002.50208.x</a>
        </li>
        <li>
          Boustani M, et al. Impact of anticholinergics on the ageing brain: a review and practical
          application. Aging Health. 2008;4(3):311–320.{" "}
          <a href="https://doi.org/10.2217/1745509X.4.3.311">doi:10.2217/1745509X.4.3.311</a>
        </li>
        <li>
          Fox C, et al. Anticholinergic medication use and cognitive impairment in the older
          population: MRC CFAS. J Am Geriatr Soc. 2011;59:1477–1483.{" "}
          <a href="https://doi.org/10.1111/j.1532-5415.2011.03491.x">doi:10.1111/j.1532-5415.2011.03491.x</a>
        </li>
        <li>
          Gray S, et al. Cumulative use of strong anticholinergic medications and incident dementia.
          JAMA Intern Med. 2015;175(3):401–407.{" "}
          <a href="https://doi.org/10.1001/jamainternmed.2014.7663">doi:10.1001/jamainternmed.2014.7663</a>
        </li>
        <li>
          Kiesel EK, Hopf YM, Drey M. An anticholinergic burden score for German prescribers: score
          development. BMC Geriatr. 2018;18.{" "}
          <a href="https://doi.org/10.1186/s12877-018-0929-6">doi:10.1186/s12877-018-0929-6</a>
        </li>
        <li>
          Lisibach A, et al. Quality of anticholinergic burden scales and their impact on clinical
          outcomes: a systematic review. Eur J Clin Pharmacol. 2021;77:147–162.{" "}
          <a href="https://doi.org/10.1007/s00228-020-02994-x">doi:10.1007/s00228-020-02994-x</a>
        </li>
      </ol>
    </article>
  );
}
