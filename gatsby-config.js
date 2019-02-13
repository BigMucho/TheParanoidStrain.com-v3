module.exports = {
  siteMetadata: {
    title: `The Paranoid Strain`,
    description: `The podcast that explains why so many people believe ridiculous conspiracy theories.`,
    siteUrl: `https://www.theparanoidstrain.com`
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
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [
                    {
                      "content:encoded": edge.node.html,
                      webMaster: "theparanoidstrain@gmail.com",
                      copyright: "2017-2019",
                      pubDate: "Tue, 12 Feb 2019 07:11:28 GMT",
                      lastBuildDate: "Tue, 12 Feb 2019 07:11:28 GMT",
                      image: [
                        {
                          link: "https://www.theparanoidstrain.com",
                          url:
                            "https://www.theparanoidstrain.com/assets/img/paranoidstrain-lg.jpg",
                          title: "The Paranoid Strain"
                        }
                      ],
                      "itunes:subtitle":
                        "The podcast that explains conspiracy theories to normal people.",
                      "itunes:author": "Fearful Jesuit",
                      "itunes:summary":
                        "Ever wonder why so many people around you believe so many weird conspiracy theories? So do we. This show explains the history of these beliefs, why people believe them even after they've been debunked, and how those beliefs can impact the real world. We interview experts, read a lot of books, and then tell you all about it. With jokes.",
                      "itunes:keywords":
                        "conspiracy theories,skepticism,politics,current events,crazy,humor",
                      "image:owner": [
                        {
                          "itunes:name": "Fearful Jesuit",
                          "itunes:email": "theparanoidstrain@gmail.com"
                        }
                      ],
                      "itunes:explicit": "Yes",
                      "itunes:image":
                        "https://www.theparanoidstrain.com/assets/img/paranoidstrain-lg.jpg",
                      "itunes:category": "Society &amp; Culture",

                      "itunes:category": "History"
                    }
                  ]
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: {frontmatter: { draft: { ne: true } }}
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Gatsby RSS Feed"
          }
        ]
      }
    },
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
    "gatsby-plugin-purgecss", // must be after other CSS plugins
    "gatsby-plugin-netlify" // make sure to keep it last in the array
  ]
};
