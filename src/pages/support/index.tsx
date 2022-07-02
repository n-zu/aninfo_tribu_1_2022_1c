import { NextPage } from "next";
import Link from 'next/link';
import { Button, Card, CardActions, CardContent, Container, Typography } from "@mui/material";
import useSWR from "swr";

const supportFetcher = (resource: string) => fetch('https://squad320221c-production.up.railway.app' + resource).then(res => res.json())

type ProjectVersion = {
    id: number,
    name: string
}

type Project = {
    id: number,
    name: string,
    versions: ProjectVersion[]
}

const SupportProject: NextPage = () => {
    const { data, error } = useSWR<Project[]>('/products', supportFetcher);

    return <Container className="page">
        <h1>Proyectos</h1>

        {data?.map(product => (
            <Card key={product.id} style={{ marginTop: "1em" }}>
                <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                </CardContent>
                <CardActions>
                    {product.versions.map(version => (
                        <Link key={version.id} href={`/support/${version.id}/tickets`}>
                            <Button>{version.name}</Button>
                        </Link>
                    ))}
                </CardActions>
            </Card>
        ))}

    </Container>
}

export default SupportProject;