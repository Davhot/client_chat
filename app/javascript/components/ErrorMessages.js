import React from 'react'
import toaster from 'toasted-notes';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

class ErrorMessages extends React.Component {
  render () {
    const alerts = this.props.errorMessages.forEach(message =>
      toaster.notify(message.error, { duration: 2000, position: 'top-right' })
    );

    return null;
  }
}

const structuredSelector = createStructuredSelector({
  errorMessages: state => state.errorMessages
});

const mapDispatchToProps = { };
export default connect(structuredSelector, mapDispatchToProps)(ErrorMessages);
