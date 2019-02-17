
const moment = require("moment");
const urljoin = require("url-join");
const config = require("./data/SiteConfig");

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    description: config.siteDescription,
    siteUrl: urljoin(config.siteUrl),
    rssMetadata: {
      timeZone: config.timeZone,
      site_url: urljoin(config.siteUrl),
      feed_url: urljoin(config.siteUrl, config.siteRss),
      title: config.siteTitle,
      description: config.siteDescription,
      image_url: `${urljoin(config.siteUrl)}/logos/logo-512.png`,
      copyright: config.copyright,
      itunesUser: config.itunes.email + " (" + config.itunes.name + ")",
      itunesName: config.itunes.name,
      itunesEmail: config.itunes.email,
      itunesLanguage: config.itunes.language,
      itunesCategory1: config.itunes.itunes_category1,
      itunesCategory2: config.itunes.itunes_category2,
      itunesKeywords: config.itunes.itunes_keywords,
      itunesExplicit: config.itunes.itunes_explicit,
      itunesSubtitle: config.itunes.itunes_subtitle
    }
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images"
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads"
            }
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048
            }
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static"
            }
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata;
          const now = moment().format("ddd, D MMM YYYY hh:mm:ss");
          // const nowNow = new moment("Mon, 06 Mar 2017 21:22:23 +0000");
          // ret.allMarkdownRemark = ref.query.allMarkdownRemark;
          ret.generator = config.siteTitle;
          ret.custom_namespaces = {
            itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd"
          };

          ret.custom_elements = [
            { language: ret.itunesLanguage },
            { copyright: ret.copyright },
            { webMaster: ret.itunesUser },
            { managingEditor: ret.itunesUser },
            {
              image: [
                { url: ret.image_url },
                { title: ret.title },
                { link: ret.site_url }
              ]
            },
            {
              "itunes:owner": [
                { "itunes:name": ret.itunesName },
                { "itunes:email": ret.itunesEmail }
              ]
            },
            { "itunes:category": ret.itunesCategory1 },
            { "itunes:category": ret.itunesCategory2 },
            { "itunes:keywords": ret.itunesKeywords },
            { "itunes:explicit": ret.itunesExplicit },
            {
              "itunes:image": {
                _attr: {
                  href: ret.image_url
                }
              }
            },
            {
              "atom:link": {
                _attr: {
                  href: ret.feed_url,
                  rel: "self",
                  type: "application/rss+xml"
                }
              }
            },
            {"pubDate": now + " " + ret.timeZone},
            {"itunes:author": ret.itunesName},
            {"itunes:summary": ret.description},
            {"itunes:subtitle": ret.itunesSubtitle},
            {"lastBuildDate": now + " " + ret.timeZone},


          ];

          return ret;
        },
        query: `
      {
        site {
          siteMetadata {
            rssMetadata {
              site_url
              feed_url
              title
              description
              image_url
              copyright
              itunesName
              itunesEmail
              itunesUser
              itunesLanguage  
              itunesCategory1
              itunesCategory2  
              itunesKeywords
              itunesExplicit   
              timeZone 
              itunesSubtitle
            }
          }
        }
      }
    `,
        feeds: [
          {
            serialize(ctx) {
              const { rssMetadata } = ctx.query.site.siteMetadata;
              return ctx.query.allMarkdownRemark.edges.map(edge => ({
                categories: edge.node.frontmatter.tags,
                date: edge.node.frontmatter.date,
                title: edge.node.frontmatter.title,
                description: edge.node.excerpt,
                url: rssMetadata.site_url + edge.node.fields.slug,
                guid: rssMetadata.site_url + edge.node.fields.slug,
                custom_elements: [
                  { "content:encoded": edge.node.html },
                  { author: config.userEmail }
                ]
              }));
            },
            query: `
          {
            allMarkdownRemark(
              limit: 1000,
              sort: { order: DESC, fields: [frontmatter___date] },
            ) {
              edges {
                node {
                  excerpt
                  html
                  timeToRead
                  fields { slug }
                  frontmatter {
                    title                   
                    date
                    tags
                  }
                }
              }
            }
          }
        `,
            output: config.siteRss
          }
        ]
      }
    },
    // {
    //   resolve: "gatsby-plugin-react-svg",
    //   options: {
    //     include: /img/
    //   }
    // },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        // Accepts all options defined by `babel-plugin-emotion` plugin.
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    },
    "gatsby-plugin-react-svg",
    "gatsby-plugin-purgecss", // must be after other CSS plugins
    "gatsby-plugin-netlify" // make sure to keep it last in the array
  ]
};
