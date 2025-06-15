import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function RepositoryCardSkeleton() {
    return (
        <article>
            <Card className="h-full">
                <CardHeader>
                    <header className="flex items-center space-x-2">
                        <Skeleton className="h-5 w-5" />
                        <Skeleton className="h-6 w-32" />
                    </header>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent>
                    <footer className="flex items-center justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-12" />
                    </footer>
                    <Skeleton className="h-3 w-24 mt-2" />
                </CardContent>
            </Card>
        </article>
    )
}

export function ReadmeCardSkeleton() {
    return (
        <article>
            <Card>
                <CardHeader>
                    <header className="flex items-center justify-between">
                        <hgroup className="flex items-center space-x-2 flex-1">
                            <Skeleton className="h-5 w-5" />
                            <Skeleton className="h-6 w-48" />
                        </hgroup>
                        <Skeleton className="h-6 w-16" />
                    </header>
                    <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                    <footer className="flex items-center justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                    </footer>
                </CardContent>
            </Card>
        </article>
    )
}

export function DraftCardSkeleton() {
    return (
        <article>
            <Card>
                <CardHeader>
                    <header className="flex items-center space-x-2">
                        <Skeleton className="h-5 w-5" />
                        <Skeleton className="h-6 w-40" />
                    </header>
                    <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <footer className="flex items-center justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-20" />
                    </footer>
                    <Skeleton className="h-2 w-full" />
                </CardContent>
            </Card>
        </article>
    )
}

export function DashboardCardSkeleton() {
    return (
        <article className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
            <Skeleton className="h-8 w-32" />
        </article>
    )
}
