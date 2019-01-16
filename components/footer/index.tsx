import { Component } from 'react'
import { ChildProps, graphql } from 'react-apollo'
import getFooterQuery from './query.graphql'
import './style.css'
import { Footer as FooterFields } from './types/Footer'

class Footer extends Component<ChildProps<{}, FooterFields>, {}> {
  public render() {
    const { globalFooter } = this.props.data

    return (
      <footer className="g-footer">
        <div className="g-container">
          <div className="top">
            {/* <NewsletterSignupForm placement="footer" /> */}
            <ul>
              {globalFooter.socialLinks.map(link => (
                <li key={link.url}>
                  <a
                    data-ga-footer={`Social | ${link.network.name}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.network.name}
                  >
                    <img
                      src={link.network.icon.url}
                      alt={link.network.icon.alt}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mid">
            <div className="logo">
              <img
                src={globalFooter.primaryLogo.url}
                alt={globalFooter.primaryLogo.alt}
              />
            </div>
            <div className="products">
              <p>Products</p>
              <ul>
                {globalFooter.allProductLinks.map(link => (
                  <li key={link.title}>
                    <a
                      data-ga-footer={`Products | ${link.title}`}
                      href={link.url}
                      {...link.external && {
                        rel: 'noopener',
                        target: '_blank'
                      }}
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="resources">
              <p>Resources</p>
              <ul>
                {globalFooter.resourcesLinks.map(link => (
                  <li key={link.url}>
                    <a
                      data-ga-footer={`Resources | ${link.title}`}
                      href={link.url}
                      {...link.external && {
                        rel: 'noopener',
                        target: '_blank'
                      }}
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="partners">
              <p>Partners</p>
              <ul>
                {globalFooter.partnerLinks.map(link => (
                  <li key={link.title}>
                    <a
                      data-ga-footer={`Partners | ${link.title}`}
                      href={link.url}
                      {...link.external && {
                        rel: 'noopener',
                        target: '_blank'
                      }}
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="company">
              <p>Company</p>
              <ul>
                {globalFooter.companyLinks.map(link => (
                  <li key={link.url}>
                    <a
                      data-ga-footer={`Company | ${link.title}`}
                      href={link.url}
                      {...link.external && {
                        rel: 'noopener',
                        target: '_blank'
                      }}
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="btm">
            <p>Copyright &copy; {new Date().getFullYear()} HashiCorp</p>
            <ul>
              {typeof window !== 'undefined' && window.openConsentManager && (
                <li>
                  <a
                    data-ga-footer="Bottom | Consent Manager"
                    onClick={window.openConsentManager}
                  >
                    Consent Manager
                  </a>
                </li>
              )}
              {globalFooter.disclaimerLinks.map(link => (
                <li key={link.url}>
                  <a
                    data-ga-footer={`Bottom | ${link.title}`}
                    href={link.url}
                    {...link.external && { rel: 'noopener', target: '_blank' }}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="not-a-bug">
            <span
              data-text="This is not a bug on the website, but rather an inside joke for some of our oldest customers."
              title="No, this is not a bug"
            >
              stdin: is not a tty
            </span>
          </div>
        </div>
      </footer>
    )
  }
}

export default graphql<{}, FooterFields>(getFooterQuery)(Footer)
