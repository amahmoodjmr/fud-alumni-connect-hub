
import React from 'react';
import { AlumniCard } from '@/components/alumni/AlumniCard';

interface AlumniGridViewProps {
  alumni: any[];
}

export function AlumniGridView({ alumni }: AlumniGridViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {alumni.length > 0 ? (
        alumni.map(alumnus => (
          <AlumniCard
            key={alumnus.id}
            id={alumnus.id}
            firstName={alumnus.first_name || ''}
            lastName={alumnus.last_name || ''}
            imageUrl={alumnus.profile_image_url}
            graduationYear={alumnus.graduation_year || 'N/A'}
            department={alumnus.department || 'N/A'}
            faculty={alumnus.faculty || 'N/A'}
            location={alumnus.state || ''}
          />
        ))
      ) : (
        <div className="col-span-3 text-center py-8">
          <p className="text-gray-500">No alumni found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
