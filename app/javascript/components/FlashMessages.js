import React from 'react'
import toaster from 'toasted-notes';

class FlashMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: props.messages };
  }

  render () {
    const alerts = this.state.messages.forEach(message =>
      toaster.notify(message.text, { duration: 2000, position: 'top-right' })
    );

    return null;
  }
}

export default FlashMessages;
