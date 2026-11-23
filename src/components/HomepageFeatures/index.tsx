import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type HomeSection = {
  id: string;
  label: string;
  to: string;
  description: string;
};

function readSections(value: unknown): HomeSection[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter(
    (item): item is HomeSection =>
      !!item &&
      typeof item === 'object' &&
      typeof item.id === 'string' &&
      typeof item.label === 'string' &&
      typeof item.to === 'string',
  );
}

export default function HomepageFeatures(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const sections = readSections(siteConfig.customFields?.sections);

  return (
    <section className={styles.section}>
      <div className="container">
        <header className={styles.sectionHead}>
          <Heading as="h2">栏目</Heading>
        </header>
        <div className={styles.grid}>
          {sections.map((section) => (
            <Link key={section.id} className={styles.card} to={section.to}>
              <Heading as="h3" className={styles.cardTitle}>
                {section.label}
              </Heading>
              {section.description ? (
                <p className={styles.cardText}>{section.description}</p>
              ) : null}
              <span className={styles.enter}>进入</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
