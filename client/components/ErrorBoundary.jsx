// // Error boundaries are great for unreliable API's
// // They are only available in CLASS COMPONENTS
// // This is a HIGHER ORDER COMPONENT. IE adds functionality and not display

// import { Component } from "react";
// import { Link, Redirect } from "react-router-dom";

// class ErrorBoundary extends Component {
//   state = { hasError: false };
//   static getDerivedStateFromError() {
//     return { hasError: true };
//   }

//   componentDidCatch(error, info) {
//     // Should log this to Sentry, Azure Monitor, New Relic, TrackJS
//     console.error("ErrorBoundary caught adn error:", error, info);
//     setTimeout(() => this.setState({ redirect: true, redirect: false }), 5000);
//   }

//   // // Can't use for errors upon initial load. SO, didn't work with our fake error from Details line 51
//   // componentDidUpdate() {
//   //   if (this.state.hasError) {
//   //     setTimeout(() => this.setState({ redirect: true }), 5000);
//   //   }
//   // }

//   render() {
//     if (this.setState.redirect) {
//       return <Redirect to="/" />;
//     } else if (this.state.hasError) {
//       return (
//         <h2>
//           This listing has an error. <Link to="/">Click here</Link> to go back
//           to the Home Page of wait five seconds.
//         </h2>
//       );
//     }
//     // will render whatever children <ErrorBoundary> has in its parent component
//     return this.props.children;
//   }
// }

// export default ErrorBoundary;