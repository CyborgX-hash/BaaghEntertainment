import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import EditProjectClient from './EditProjectClient';

export const dynamic = 'force-dynamic';

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session || (session.user as any)?.role !== 'ADMIN') redirect('/login');

    const { id } = await params;

    const project = await prisma.project.findUnique({
        where: { id }
    });

    if (!project) redirect('/portfolio');

    return <EditProjectClient project={project} />;
}
