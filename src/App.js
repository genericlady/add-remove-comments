import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import uid from 'uid'
import './App.css';
import { fetchPricesMock } from './mocks/fetchPricesMock';
import CommentArea from './components/CommentArea';

class App extends Component {
  state = {
    prices: [],
  }

  componentDidMount() {
    const { prices } = fetchPricesMock();
    this.setState({ prices });
  }

  addComment = (href, comment) => {
    const {
      prices,
    } = this.state;
    let updatedPrices = [];
    const itemIndex = prices.findIndex(p => p.href === href);
    const item = prices[itemIndex];

    if (item && 'comments' in item) {
      const {
        comments,
      } = item;
      item.comments = [...comments, comment];
      updatedPrices = Object.assign(prices.slice(), item);
    }

    if (!isEmpty(updatedPrices)) {
      this.setState({ prices: updatedPrices });
    }
  }

  deleteComment = (href, index) => {
    const {
      prices,
    } = this.state;
    let updatedPrices = [];
    const itemIndex = prices.findIndex(p => p.href === href);
    const item = prices[itemIndex];
    if (item && 'comments' in item) {
      const {
        comments,
      } = item;
      item.comments = [...comments.slice(0, index), ...comments.slice(index + 1)];
      updatedPrices = Object.assign(prices.slice(), item);
    }

    if (!isEmpty(updatedPrices)) {
      this.setState({ prices: updatedPrices });
    }
  }

  render() {
    const {
      prices,
    } = this.state;

    return (
      <main role="main">
        <div className="album text-muted">
          <div className="container">
            <div className="row">
              {
                !isEmpty(prices) &&
                    prices.map(({image, description, comments, href}, index) => (
                      <div className="card col-md-3" key={uid()}>
                        <img
                          alt="Thumbnail [100%x280]"
                          src={image}
                          data-holder-rendered="true"
                        />
                        <p className="card-text">
                          {description}
                        </p>
                        <div className="leaveComment">
                          <h3>Leave a comment</h3>
                          <CommentArea updateItem={this.addComment} href={href} />
                        </div>
                        <div className="comments">
                          {
                            !isEmpty(comments) &&
                            comments.map(({user, body}, index) => (
                              <div className="comment" key={uid()}>
                                <div>Comment by: {user}</div>
                                <div>{body} | 
                                  <a
                                    onClick={() => this.deleteComment(href, index)}
                                  >X</a>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    ))
              }
            </div>
          </div>
        </div>
      </main>

    );
  }
}

export default App;
