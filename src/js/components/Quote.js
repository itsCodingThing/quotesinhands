import React, { Component } from "react";
import Quote from "./Render";
import { getQuotes } from "../utils/utils";

let BlockQuote = ({ quote, showLoader }) => (
  <blockquote className="blockquote text-center">
    <Quote content={quote} showLoader={showLoader} />
  </blockquote>
);

export default class QuoteGen extends Component {
  state = {
    quote: [{}],
    nextQ: {},
    showLoader: true,
    disableBtn: true,
    index: 0
  };

  componentDidMount() {
    getQuotes().then(res => {
      this.setState(prevState => ({
        quote: [...prevState.quote, res],
        nextQ: res,
        showLoader: !prevState.showLoader,
        disableBtn: !prevState.disableBtn,
        index: prevState.quote.length
      }));
    });
  }

  toggleLoader = () => {
    this.setState(({ showLoader, disableBtn }) => ({
      showLoader: !showLoader,
      disableBtn: !disableBtn
    }));
  };

  changeQuote = () => {
    this.toggleLoader();
    getQuotes().then(res => {
      this.setState(({ quote, showLoader, disableBtn }) => ({
        quote: [...quote, res],
        nextQ: res,
        showLoader: !showLoader,
        disableBtn: !disableBtn,
        index: quote.length - 1
      }));
    });
  };

  prevQuote = () => {
    let quotes = this.state.quote;
    if (this.state.index > 0) {
      this.setState(prevState => {
        return {
          nextQ: quotes[prevState.index],
          index: prevState.index - 1
        };
      });
    }
  };

  render() {
    let { quote, showLoader, disableBtn, nextQ } = this.state;
    console.log(quote);
    return (
      <div className="wrapper text-center">
        <BlockQuote quote={nextQ} showLoader={showLoader} />
        <div className="buttonBox d-flex justify-content-around">
          <button
            className="btn btn-primary btn-sm"
            onClick={this.prevQuote}
            disabled={disableBtn}
          >
            Prev
          </button>
          <button
            className="btn btn-primary btn-sm"
            disabled={disableBtn}
            onClick={this.changeQuote}
          >
            Next
          </button>
        </div>
        <style jsx>{`
          .wrapper {
            padding-top: 2rem;
            padding-bottom: 2rem;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }

          button {
            margin-right: 2rem;
            margin-left: 2rem;
          }

          @media (min-width: 992px) {
            .wrapper {
              padding-right: 5rem;
              padding-left: 5rem;
            }
          }
        `}</style>
      </div>
    );
  }
}