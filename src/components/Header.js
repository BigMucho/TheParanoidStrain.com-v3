import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import Vars from "../utils/globalVars.js";
import PSlogo from "../img/ps-logo-long-2.png";
import IconRss from "../img/rss.svg";
import IconBars from "../img/bars.svg";

const thisBreak = Vars.breakpoint.sm;

const Styled = styled.div`
  margin-top: calc(${Vars.spacer} / 2);
  padding-left: calc(${Vars.spacer} / 2);
  padding-right: calc(${Vars.spacer} / 2);

  @media screen and (min-width: ${Vars.maxWidth}) {
    padding-left: calc((100% - ${Vars.maxWidth}) / 2);
    padding-right: calc((100% - ${Vars.maxWidth}) / 2);
  }

  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${thisBreak}) {
    flex-direction: column;
  }
  justify-content: center;
  align-items: center;
  margin-bottom: ${Vars.spacer};

  img {
    margin-bottom: 0;
  }

  .links {
    display: flex;
    flex-direction: column;
    @media screen and (min-width: ${thisBreak}) {
      flex-direction: row;
    }
    .link {
      text-transform: uppercase;
      text-align: center;
      color: ${Vars.color};
      margin: 0;
      font-size: 1.2rem;
      letter-spacing: -1px;
      flex: 0 1 auto;
      @media screen and (min-width: ${thisBreak}) {
        &:not(:last-child) {
          margin-right: calc(${Vars.spacer});
        }
      }
      @media screen and (max-width: ${thisBreak}) {
        /* display: none; */
        margin-top: calc(${Vars.spacer} / 2);
      }
    }
  }

  .top {
    display: flex;
    .image {
      display: flex;
      align-items: center;
    }
    .hamburger {
      display: flex;
      align-items: center;
      color: ${Vars.color.main};
      margin-left: calc(${Vars.spacer} / 2);
      @media screen and (min-width: ${thisBreak}) {
        margin-left: none;
        display: none;
      }
    }
  }
  .icon {
    fill: ${Vars.color.main};
    width: 16px;
  }
`;

class Header extends React.Component {
  state = { showing: true };

  toggleMenu = () => {
    this.setState({
      showing: !this.state.showing
    });
  };

  componentDidMount = () => {
    const windowGlobal = typeof window !== "undefined" && window;
    if (windowGlobal.innerWidth < 480) {
      this.setState({
        showing: false
      });
    }
  };

  render() {
    const { showing } = this.state;
    return (
      <Styled>
        <div className="top">
          <div className="image">
            <img
              src={PSlogo}
              alt="The Paranoid Strain"
              onClick={this.alertName}
            />
          </div>
          <div className="hamburger">
            <IconBars className="icon" onClick={() => this.toggleMenu()} />
          </div>
        </div>

        {showing ? (
          <div className="links">
            <Link to="/" className="link">
              <strong>Home</strong>
            </Link>
            <Link to="/about" className="link">
              <strong>About</strong>
            </Link>

            <Link to="/contact" className="link">
              <strong>Contact</strong>
            </Link>

            <Link className="link">
              <strong>Subscribe</strong>&nbsp;&nbsp;&nbsp;
              <IconRss className="icon" />
            </Link>
          </div>
        ) : null}
      </Styled>
    );
  }
}

export default Header;
