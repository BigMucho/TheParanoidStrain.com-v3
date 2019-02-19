import React from "react";
import styled from "@emotion/styled";
import Vars from "../utils/globalVars.js";
// import config from "../utils/SiteConfig.js";
import IconEmail from "../img/envelope.svg";
import AmazonLogo from "../../static/img/amazon-banner.jpg";
import { TwitterTimelineEmbed } from "react-twitter-embed";

const Styled = styled.div`
  flex: 0 1 280px;
  min-height: 300px;
  font-size: 15px;
  * {
    margin: 0px;
  }

  @media screen and (max-width: ${Vars.breakpoint.xl}) {
    margin-top: calc(${Vars.spacer}*2);
  }
  display: flex;
  flex-direction: column;
  > * {
    flex: 0 1 auto;
    border-radius: 10px;

    padding: calc(${Vars.spacer}*0.65);
    &:not(:last-child) {
      margin-bottom: calc(${Vars.spacer} / 2);
    }
  }
  .border {
    border: 1px solid #ddd;
  }
  .icon {
    fill: ${Vars.color.lightGray};
    width: 16px;
  }
  .emailMe {
    /* font-size: 16px; */
    text-align: center;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      > * {
        flex: 0 1 auto;
      }
    }
  }
  .amazon {
    a {
      color: #000 !important;
    }
  }
  .twitter {
    /* min-height: 500px; */
  }
`;

class Sidebar extends React.Component {
  render() {
    return (
      <Styled>
        <div className="emailMe">
          <div>
            <IconEmail className="icon" />
            <p>
              <strong>&nbsp;&nbsp;Email me:</strong>
            </p>
          </div>
          <p>
            theparanoidstrain at gmail dot com
          </p>
        </div>
        <div className="amazon border">
        <a href="https://www.amazon.com/?&tag=paranoi05-20&camp=216797&creative=493977&linkCode=ur1&adid=0KVF09CFZHMKQA54N2WN&">
          <img src={AmazonLogo} alt="Amazon.com" />
          <p>
            Click through from our site, and your regular Amazon purchases
            support the Paranoid Strain, at no additional cost to you. You
            support us, we keep bringing the crazy.
          </p>
          </a>
        </div>
        <div className="twitter border">
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="paranoidstrain"
            options={{ height: 600 }}
          />
        </div>
        {/* <div className="calendar border">calendar</div> */}
      </Styled>
    );
  }
}

export default Sidebar;
