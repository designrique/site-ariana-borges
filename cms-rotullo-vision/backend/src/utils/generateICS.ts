const formatICSDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

interface GenerateICSProps {
    start: Date;
    duration?: number; // em minutos
    title: string;
    description: string;
    location?: string;
    organizer?: { name: string; email: string };
    attendee?: { name: string; email: string };
}

export const generateICS = async ({
    start,
    duration = 60,
    title,
    description,
    location,
    organizer,
    attendee
}: GenerateICSProps): Promise<string> => {

    const end = new Date(start.getTime() + duration * 60000);
    const now = new Date();
    const uid = `${now.getTime()}@institutoarianaborges.com.br`;

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Instituto Ariana Borges//App//PT-BR',
        'CALSCALE:GREGORIAN',
        'METHOD:REQUEST',
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${formatICSDate(now)}`,
        `DTSTART:${formatICSDate(start)}`,
        `DTEND:${formatICSDate(end)}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
        location ? `LOCATION:${location}` : '',
        organizer ? `ORGANIZER;CN=${organizer.name}:MAILTO:${organizer.email}` : '',
        attendee ? `ATTENDEE;RSVP=TRUE;CN=${attendee.name}:MAILTO:${attendee.email}` : '',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
    ].filter(line => line).join('\r\n');

    return icsContent;
};
