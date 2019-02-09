import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import Vars from "../utils/globalVars.js";
import PSlogo from "../img/ps-logo-long.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRss } from "@fortawesome/pro-solid-svg-icons";


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
      color: ${Vars.color};
      margin-left: calc(${Vars.spacer} / 2);
      @media screen and (min-width: ${thisBreak}) {
        margin-left: none;
        display: none;
      }
    }
  }
`;

class Header extends React.Component {
  state = { showing: true };

  constructor(props) {
    super(props);
    (() => {
      const windowGlobal = typeof window !== 'undefined' && window
      if (windowGlobal.innerWidth < 480) {
        this.state = { showing: false };
      }
    })();
  }

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
          <FontAwesomeIcon
              icon={faBars}
              size="lg"
              onClick={() => this.setState({ showing: !showing })}
            />
          </div>
        </div>

        {showing ? (
          <div className="links">
            <Link className="link">
              <strong>Home</strong>
            </Link>
            <Link className="link">
              <strong>Episodes</strong>
            </Link>
            <Link className="link">
              <strong>About Us</strong>
            </Link>
            <Link className="link">
              <strong>Subscribe</strong>&nbsp;&nbsp;&nbsp;
              <FontAwesomeIcon
              icon={faRss}
              size="sm"
            />
            </Link>
          </div>
        ) : null}
      </Styled>
    );
  }
}

export default Header;
