export default function Footer() {
  return (
    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      <ul className="nav navbar-nav navbar-right">
           <li>
               <a href="#">
                   <i className="fa fa-facebook-square"></i>
                   Share
               </a>
           </li>
            <li>
               <a href="#">
                   <i className="fa fa-twitter"></i>
                   Tweet
               </a>
           </li>
            <li>
               <a href="#">
                   <i className="fa fa-envelope-o"></i>
                   Email
               </a>
           </li>
      </ul>
    </footer>
  );
}
