
import React from 'react';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AlumniTableViewProps {
  alumni: any[];
}

export function AlumniTableView({ alumni }: AlumniTableViewProps) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Graduation Year</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Faculty</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alumni.length > 0 ? (
            alumni.map(alumnus => (
              <TableRow key={alumnus.id}>
                <TableCell className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={alumnus.profile_image_url} />
                    <AvatarFallback>{alumnus.first_name?.[0]}{alumnus.last_name?.[0]}</AvatarFallback>
                  </Avatar>
                  <span>{alumnus.first_name} {alumnus.last_name}</span>
                </TableCell>
                <TableCell>{alumnus.graduation_year || 'N/A'}</TableCell>
                <TableCell>{alumnus.department || 'N/A'}</TableCell>
                <TableCell>{alumnus.faculty || 'N/A'}</TableCell>
                <TableCell>{alumnus.state || 'N/A'}</TableCell>
                <TableCell>
                  <a href={`mailto:${alumnus.email}`} className="text-fud-green hover:underline">
                    {alumnus.email}
                  </a>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No alumni found matching your criteria.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
