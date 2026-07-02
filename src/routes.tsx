import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import Bundles from "./pages/Bundles";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";
import BundleDetail from "./pages/BundleDetail";
import About from "./pages/About";
import LicenseTerms from "./pages/LicenseTerms";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "templates", Component: Templates },
      { path: "bundles", Component: Bundles },
      { path: "checkout", Component: Checkout },
      { path: "payment", Component: Payment },
      { path: "success", Component: Success },
      { path: "contact", Component: Contact },
      { path: "faq", Component: FAQ },
      { path: "privacy-policy", Component: PrivacyPolicy },
      { path: "terms-of-service", Component: TermsOfService },
      { path: "refund-policy", Component: RefundPolicy },
      { path: "license-terms", Component: LicenseTerms },
      { path: "about", Component: About },
      { path: "bundles/complete-creator-bundle", Component: BundleDetail },
    ],
  },
]);
