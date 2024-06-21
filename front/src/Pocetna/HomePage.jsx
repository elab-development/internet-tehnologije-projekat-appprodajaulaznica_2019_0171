import React from 'react';
import { FaTicketAlt, FaRegCalendarAlt, FaRegMoneyBillAlt, FaMapMarkerAlt } from 'react-icons/fa';

const colors = {
  primary: '#35524a',
  secondary: '#627c85',
  tertiary: '#779cab',
  accent: '#a2e8dd',
  highlight: '#32de8a'
};

const HomePage = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: colors.accent, minHeight: '100vh', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: colors.primary }}>Dobrodošli na Prodaja Ulaznica</h1>
        <p style={{ color: colors.secondary }}>Kupite ulaznice za svoje omiljene događaje brzo i jednostavno!</p>
      </header>

      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <div style={{ backgroundColor: colors.primary, color: 'white', padding: '20px', borderRadius: '10px', width: '300px', margin: '10px' }}>
          <FaTicketAlt size={50} />
          <h2>Kupite Ulaznice</h2>
          <p>Izaberite i kupite ulaznice za različite događaje.</p>
        </div>
        <div style={{ backgroundColor: colors.tertiary, color: 'white', padding: '20px', borderRadius: '10px', width: '300px', margin: '10px' }}>
          <FaRegCalendarAlt size={50} />
          <h2>Pregledajte Događaje</h2>
          <p>Pronađite događaje u vašem gradu i planirajte unapred.</p>
        </div>
        <div style={{ backgroundColor: colors.secondary, color: 'white', padding: '20px', borderRadius: '10px', width: '300px', margin: '10px' }}>
          <FaRegMoneyBillAlt size={50} />
          <h2>Povoljne Cene</h2>
          <p>Uživajte u pristupačnim cenama i posebnim ponudama.</p>
        </div>
        <div style={{ backgroundColor: colors.highlight, color: 'white', padding: '20px', borderRadius: '10px', width: '300px', margin: '10px' }}>
          <FaMapMarkerAlt size={50} />
          <h2>Lokacije</h2>
          <p>Pronađite lokacije događaja na interaktivnoj mapi.</p>
        </div>
      </div>

      <section style={{ marginTop: '40px' }}>
        <h2 style={{ textAlign: 'center', color: colors.primary }}>Predstojeći Događaji</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          <div style={{ backgroundColor: colors.primary, color: 'white', padding: '20px', borderRadius: '10px', width: '250px', margin: '10px' }}>
            <h3>Koncert u Parku</h3>
            <p>Datum: 25. Jun</p>
            <p>Lokacija: Beogradski Park</p>
          </div>
          <div style={{ backgroundColor: colors.tertiary, color: 'white', padding: '20px', borderRadius: '10px', width: '250px', margin: '10px' }}>
            <h3>Filmski Festival</h3>
            <p>Datum: 1. Jul</p>
            <p>Lokacija: Novi Sad</p>
          </div>
          <div style={{ backgroundColor: colors.secondary, color: 'white', padding: '20px', borderRadius: '10px', width: '250px', margin: '10px' }}>
            <h3>Tehno žurka</h3>
            <p>Datum: 15. Jul</p>
            <p>Lokacija: Kragujevac</p>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: 'center', marginTop: '40px', color: colors.secondary }}>
        <p>&copy; 2024 Prodaja Ulaznica. Sva prava zadržana.</p>
      </footer>
    </div>
  );
};

export default HomePage;
