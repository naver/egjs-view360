import React from "react";
import InfoSVG from "../../static/icon/info.svg";

const LICENSE_TO_LINK = {
  CC0: "https://creativecommons.org/publicdomain/zero/1.0/",
  "Creative Commons Attribution": "https://creativecommons.org/licenses/by/4.0/",
  "CC Attribution-NonCommercial-ShareAlike": "http://creativecommons.org/licenses/by-nc-sa/4.0/"
};

export default ({ items = [], className = "" }: {
  className?: string;
  items?: Array<{
    name: string;
    link: string;
    author: string;
    authorLink: string;
    license: string;
  }>;
}) => (<div className={className}>
  <article className="message is-info">
    <div className="message-body">
      <div className="mb-2 is-flex is-align-items-center">
        <InfoSVG className="mr-1" />
        <span className="has-text-weight-bold">Assets Used</span>
      </div>
      {
        items.map((item, idx) => (
          <div key={idx}>
            <span className="mx-2">▪</span><a href={item.link}>{ item.name }</a> by <a href={item.authorLink}>{ item.author }</a> licensed under <a href={LICENSE_TO_LINK[item.license]}>{ item.license }</a>
          </div>
        ))
      }
    </div>
  </article>
</div>);
