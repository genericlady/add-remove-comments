import React, { Component } from 'react';
import { func, string } from 'prop-types';

class CommentArea extends Component {
  static defaultProps = {
    updateItem: () => {},
    href: '',
  }

  static propTypes = {
    updateItem: func,
    href: string,
  }

  state = {
    comment: {},
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      updateItem = () => {},
      href = '',
    } = this.props;
    const {
      comment,
    } = this.state;
    updateItem(href, comment);
  }

  setComment = ({target: { value }}) => {
    this.setState({ comment: { body: value, user: 'mr foo' } });
  }

  render() {
    const {
      comment,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <textarea rows="4" cols="58" name="leaveComment"
          value={comment.body}
          onChange={(event) => this.setComment(event)} />
        <br />
        <input type="submit" value="Add" />
      </form>
    )
  }
}
export default CommentArea;
