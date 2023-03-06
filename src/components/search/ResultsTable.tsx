import { SearchResult } from '@/types/SearchResult';
import Link from 'next/link';
import Table from 'react-bootstrap/Table';

type Props = {
  results: SearchResult[];
};
const ResultsTable = ({ results }: Props) => {
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>Job title</th>
          <th>From</th>
          <th>Added on</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result) => (
          <Link
            legacyBehavior
            href={result.url!}
            target="_blank"
            key={result.id}
          >
            <tr>
              <td>{result.title}</td>
              <td>{result.website}</td>
              <td>{new Date(result.created_at).toLocaleDateString()}</td>
            </tr>
          </Link>
        ))}
      </tbody>
    </Table>
  );
};

export default ResultsTable;
