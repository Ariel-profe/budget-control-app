
export const formatDate = ( dateObj: number ) => {

    const date = new Date(dateObj);

    const opts: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    };

    return date.toLocaleDateString( 'es-ES', opts )

};


