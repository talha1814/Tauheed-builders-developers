import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, ArrowRight, Layers, Building2 } from 'lucide-react';
import { Project } from '@/lib/types';
import { formatPKRShort } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const statusStyles: Record<string, { label: string; bg: string; text: string }> = {
    'under-construction': { label: 'Under Construction', bg: 'bg-[#B89A68]/15', text: 'text-[#B89A68]' },
    'ready-to-move': { label: 'Ready to Move', bg: 'bg-emerald-950/40', text: 'text-emerald-400' },
    'upcoming': { label: 'Upcoming Launch', bg: 'bg-blue-950/40', text: 'text-blue-400' },
    'completed': { label: 'Delivered', bg: 'bg-zinc-800', text: 'text-zinc-300' },
  };

  const statusInfo = statusStyles[project.status] || {
    label: project.status,
    bg: 'bg-zinc-800',
    text: 'text-zinc-300',
  };

  return (
    <article className="group bg-white rounded-lg overflow-hidden border border-[#E8E7E2] hover:border-[#B89A68]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
        <Image
          src={project.heroImage}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-[#171A1D]/90 text-white rounded backdrop-blur-sm">
            {project.category}
          </span>
          <span className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded backdrop-blur-sm border border-current/20 ${statusInfo.bg} ${statusInfo.text}`}>
            {statusInfo.label}
          </span>
        </div>

        {/* Bottom Overlay Price on Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white pointer-events-none">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-300">Starting From</div>
            <div className="text-base font-semibold text-[#D4BD8F]">
              {project.priceStartingFrom ? formatPKRShort(project.priceStartingFrom) : 'Price on Request'}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#73777C] mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#B89A68] shrink-0" />
            <span className="truncate">{project.address}, {project.city}</span>
          </div>

          <h3 className="font-serif text-xl font-bold text-[#202124] group-hover:text-[#B89A68] transition-colors line-clamp-1">
            <Link href={`/projects/${project.slug}`}>
              {project.name}
            </Link>
          </h3>

          <p className="mt-2 text-xs text-[#73777C] line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-[#E8E7E2]">
          <div className="grid grid-cols-2 gap-2 text-xs text-[#73777C] mb-4">
            {project.expectedCompletion && (
              <div className="flex items-center gap-1.5 truncate">
                <Calendar className="w-3.5 h-3.5 text-[#B89A68]" />
                <span className="truncate">{project.expectedCompletion}</span>
              </div>
            )}
            {project.totalFloors && (
              <div className="flex items-center gap-1.5 truncate">
                <Layers className="w-3.5 h-3.5 text-[#B89A68]" />
                <span className="truncate">{project.totalFloors} Storeys</span>
              </div>
            )}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#171A1D] bg-[#F7F6F2] hover:bg-[#B89A68] hover:text-white transition-all duration-200 rounded group-hover:border-[#B89A68]"
          >
            <span>View Project & Units</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
