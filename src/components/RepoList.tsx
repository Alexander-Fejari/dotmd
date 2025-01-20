import { RepoWithReadme } from "@/types/github";

interface RepoListProps {
    repos: RepoWithReadme[];
}

const RepoList = ({ repos }:RepoListProps) => {
    if (!repos.length) {
        return <p>No repositories with README.md found.</p>;
    }

    return (
        <ul>
            {repos.map((repo, index) => (
                <li className={"max-w-4xl"} key={index}>
                    <h2>{repo.name}</h2>
                    <p>{repo.description || "No description available"}</p>
                    <span className={"flex justify-center "}>{repo.readme || "No README.md available"}</span>
                </li>
            ))}
        </ul>
    );
};

export default RepoList;
