
export interface EmployeeTransaction {
  date: string
  description: string
  card_type: string
  last_five: string
  amount: number
  point_multiple: number
}

const rawData = `date	description	card_type	last_five	amount	point_multiple
2025-01-01	ENTRECENTER         MIAMI BEACH         FL	Blue Plus I	-01026	2000.00	2.0
2025-01-01	ENTRECENTER         MIAMI BEACH         FL	Blue Plus I	-01018	4000.00	2.0
2025-01-04	KAJABI              NEWPORT BEACH       CA	Blue Plus I	-01026	199.00	2.0
2025-01-04	PAYPAL *SQUAREUP    35314369001         CA	Blue Plus I	-01018	500.00	2.0
2025-01-05	AMAZON.COM*2G8MG1DA3 AMZN.COM/BILL       WA	Blue Plus I	-01026	89.99	2.0
2025-01-05	STRIPE              STRIPE.COM          CA	Blue Plus I	-01018	1250.00	2.0
2025-01-07	GOOGLE *ADS1234567  GOOGLE.COM          CA	Blue Plus I	-01026	850.00	2.0
2025-01-07	MICROSOFT*OFFICE365 REDMOND             WA	Blue Plus I	-01018	29.99	2.0
2025-01-08	ZOOM.US             SAN JOSE            CA	Blue Plus I	-01026	14.99	2.0
2025-01-08	SLACK TECHNOLOGIES  SAN FRANCISCO       CA	Blue Plus I	-01018	80.00	2.0
2025-01-09	ADOBE *CREATIVE     SAN JOSE            CA	Blue Plus I	-01026	52.99	2.0
2025-01-09	CANVA               SYDNEY              AU	Blue Plus I	-01018	12.95	2.0
2025-01-10	NOTION LABS INC     SAN FRANCISCO       CA	Blue Plus I	-01026	10.00	2.0
2025-01-10	FIGMA               SAN FRANCISCO       CA	Blue Plus I	-01018	15.00	2.0
2025-01-11	GITHUB              SAN FRANCISCO       CA	Blue Plus I	-01026	7.00	2.0
2025-01-11	DROPBOX             SAN FRANCISCO       CA	Blue Plus I	-01018	11.99	2.0
2025-01-12	NETLIFY             SAN FRANCISCO       CA	Blue Plus I	-01026	19.00	2.0
2025-01-12	VERCEL              SAN FRANCISCO       CA	Blue Plus I	-01018	20.00	2.0
2025-01-13	AWS MARKETPLACE     SEATTLE             WA	Blue Plus I	-01026	156.78	2.0
2025-01-13	DIGITALOCEAN.COM    NEW YORK            NY	Blue Plus I	-01018	24.00	2.0
2025-01-14	HEROKU              SAN FRANCISCO       CA	Blue Plus I	-01026	25.00	2.0
2025-01-14	MONGODB INC         NEW YORK            NY	Blue Plus I	-01018	57.00	2.0
2025-01-15	STRIPE              STRIPE.COM          CA	Blue Plus I	-01026	789.50	2.0
2025-01-15	PAYPAL *SQUAREUP    35314369001         CA	Blue Plus I	-01018	345.00	2.0
2025-01-16	SHOPIFY PAYMENTS    OTTAWA              ON	Blue Plus I	-01026	29.00	2.0
2025-01-16	WOOCOMMERCE         SAN FRANCISCO       CA	Blue Plus I	-01018	199.00	2.0
2025-01-17	MAILCHIMP           ATLANTA             GA	Blue Plus I	-01026	34.99	2.0
2025-01-17	CONSTANT CONTACT    WALTHAM             MA	Blue Plus I	-01018	45.00	2.0
2025-01-18	HUBSPOT             CAMBRIDGE           MA	Blue Plus I	-01026	890.00	2.0
2025-01-18	SALESFORCE.COM      SAN FRANCISCO       CA	Blue Plus I	-01018	150.00	2.0
2025-01-19	ZENDESK             SAN FRANCISCO       CA	Blue Plus I	-01026	89.00	2.0
2025-01-19	INTERCOM            SAN FRANCISCO       CA	Blue Plus I	-01018	99.00	2.0
2025-01-20	CALENDLY            ATLANTA             GA	Blue Plus I	-01026	10.00	2.0
2025-01-20	ACUITY SCHEDULING   NEW YORK            NY	Blue Plus I	-01018	25.00	2.0
2025-01-21	TYPEFORM            BARCELONA           ES	Blue Plus I	-01026	35.00	2.0
2025-01-21	JOTFORM             SAN FRANCISCO       CA	Blue Plus I	-01018	39.00	2.0
2025-01-22	LOOM                SAN FRANCISCO       CA	Blue Plus I	-01026	8.00	2.0
2025-01-22	VIMEO               NEW YORK            NY	Blue Plus I	-01018	20.00	2.0
2025-01-23	BUFFER              SAN FRANCISCO       CA	Blue Plus I	-01026	15.00	2.0
2025-01-23	HOOTSUITE           VANCOUVER           BC	Blue Plus I	-01018	49.00	2.0
2025-01-24	LATER               VANCOUVER           BC	Blue Plus I	-01026	25.00	2.0
2025-01-24	SPROUT SOCIAL       CHICAGO             IL	Blue Plus I	-01018	89.00	2.0
2025-01-25	AIRTABLE            SAN FRANCISCO       CA	Blue Plus I	-01026	20.00	2.0
2025-01-25	MONDAY.COM          TEL AVIV            IL	Blue Plus I	-01018	39.00	2.0
2025-01-26	ASANA               SAN FRANCISCO       CA	Blue Plus I	-01026	30.99	2.0
2025-01-26	TRELLO              NEW YORK            NY	Blue Plus I	-01018	12.50	2.0
2025-01-27	CLICKUP             SAN DIEGO           CA	Blue Plus I	-01026	7.00	2.0
2025-01-27	BASECAMP            CHICAGO             IL	Blue Plus I	-01018	99.00	2.0
2025-01-28	FRESHWORKS          SAN MATEO           CA	Blue Plus I	-01026	29.00	2.0
2025-01-28	PIPEDRIVE           NEW YORK            NY	Blue Plus I	-01018	24.90	2.0
2025-01-29	CLOSE               REDWOOD CITY        CA	Blue Plus I	-01026	89.00	2.0
2025-01-29	COPPER              SAN FRANCISCO       CA	Blue Plus I	-01018	59.00	2.0
2025-01-30	MIXPANEL            SAN FRANCISCO       CA	Blue Plus I	-01026	89.00	2.0
2025-01-30	AMPLITUDE           SAN FRANCISCO       CA	Blue Plus I	-01018	61.00	2.0
2025-01-31	HOTJAR              VALLETTA            MT	Blue Plus I	-01026	89.00	2.0
2025-01-31	FULLSTORY           ATLANTA             GA	Blue Plus I	-01018	199.00	2.0`

export const staticEmpData: EmployeeTransaction[] = rawData
  .split('\n')
  .slice(1) // Skip header row
  .filter(line => line.trim()) // Filter out empty lines
  .map(line => {
    const [date, description, card_type, last_five, amount, point_multiple] = line.split('\t')
    return {
      date,
      description,
      card_type,
      last_five,
      amount: parseFloat(amount),
      point_multiple: parseFloat(point_multiple)
    }
  })
