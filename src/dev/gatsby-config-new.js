module.exports = {
  siteMetadata: {
    title: `The Paranoid Strain`,
    description: `The podcast that explains why so many people believe ridiculous conspiracy theories.`,
    link: `https://www.theparanoidstrain.com`,
    siteUrl: `https://www.theparanoidstrain.com`,
    rssMetadata: {
      metaLink: `https://www.theparanoidstrain.com`,
      language: `en-us`,
      copyright: "2019",
      webMaster: "theparanoidstrain@gmail.com (The Paranoid Strain)",
      managingEditor: "theparanoidstrain@gmail.com (The Paranoid Strain)",
      itunes_keywords: "separate, by, comma, and, space",
      itunes_category1: "category 1",
      itunes_category2: "category 2",
      image: {
        url: "http://www.YourSite.com/ImageSize300X300.jpg",
        title: "Image Title",
        link: "Image link"
      },
      itunesName: "The Paranoid Strain",
      itunesEmail: "theparanoidstrain@gmail.com"
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
      resolve: `gatsby-plugin-feed`,
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata;
          // ret.allMarkdownRemark = ref.query.allMarkdownRemark;
          return {
            title: ref.query.site.siteMetadata.title,
            description: ref.query.site.siteMetadata.description,
            // link: ref.query.site.siteMetadata.link,

            custom_namespaces: {
              itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd"
            },
            custom_elements: [
              { language: ret.language },
              { copyright: ret.copyright },
              { webMaster: ret.webMaster },
              { managingEditor: ret.managingEditor },
              {
                image: [
                  { url: ret.image.url },
                  { title: ret.image.title },
                  { link: ret.image.link }
                ]
              },
              {
                "itunes:owner": [
                  { "itunes:name": ret.itunesName },
                  { "itunes:email": ret.itunesEmail }
                ]
              },
              {
                "itunes:image": {
                  _attr: {
                    href:
                      "http://example.com/podcasts/everything/AllAboutEverything.jpg"
                  }
                }
              },
              { "itunes:category": ret.itunes_category1 },
              { "itunes:category": ret.itunes_category2 },
              { "itunes:keywords": ret.itunes_keywords }
            ]
          };
        },
        query: `
          {
            site {
              siteMetadata {                
                title
                description
                
                siteUrl
                site_url: siteUrl
                rssMetadata {
                  language
                  copyright
                  webMaster
                  managingEditor
                  image {   
                    url
                    title
                    link
                  }
                  itunesName
                  itunesEmail
                  itunes_keywords
                  itunes_category1
                  itunes_category2
                }
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
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug
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
