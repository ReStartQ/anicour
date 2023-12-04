import { SvgIcon } from '@mui/material';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export function MediaIcons({ type }: any) {
  console.log(type);
  if (type === 0) {
    return (
      <SvgIcon fontSize="small">
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          fill="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {' '}
            <defs>
              {' '}
              <clipPath id="clip-notepad">
                {' '}
                <rect width="32" height="32" />{' '}
              </clipPath>{' '}
            </defs>{' '}
            <g id="notepad" clipPath="url(#clip-notepad)">
              {' '}
              <g
                id="Group_3042"
                data-name="Group 3042"
                transform="translate(-260 -156)"
              >
                {' '}
                <g id="Group_3024" data-name="Group 3024">
                  {' '}
                  <g id="Group_3023" data-name="Group 3023">
                    {' '}
                    <g id="Group_3022" data-name="Group 3022">
                      {' '}
                      <g id="Group_3021" data-name="Group 3021">
                        {' '}
                        <path
                          id="Path_3967"
                          data-name="Path 3967"
                          d="M287.632,157.923h-3.559v-.757a1,1,0,0,0-2,0v.757h-2.721v-.757a1,1,0,1,0-2,0v.757h-2.721v-.757a1,1,0,0,0-2,0v.757H269.91v-.757a1,1,0,0,0-2,0v.757h-3.542a1,1,0,0,0-1,1v27.911a1,1,0,0,0,1,1h23.264a1,1,0,0,0,1-1V158.923A1,1,0,0,0,287.632,157.923Zm-1,27.911H265.368V159.923h2.542v.756a1,1,0,0,0,2,0v-.756h2.721v.756a1,1,0,0,0,2,0v-.756h2.721v.756a1,1,0,0,0,2,0v-.756h2.721v.756a1,1,0,0,0,2,0v-.756h2.559Z"
                          fill="#ffffff"
                        />{' '}
                      </g>{' '}
                    </g>{' '}
                  </g>{' '}
                </g>{' '}
                <g id="Group_3041" data-name="Group 3041">
                  {' '}
                  <g id="Group_3028" data-name="Group 3028">
                    {' '}
                    <g id="Group_3027" data-name="Group 3027">
                      {' '}
                      <g id="Group_3026" data-name="Group 3026">
                        {' '}
                        <g id="Group_3025" data-name="Group 3025">
                          {' '}
                          <path
                            id="Path_3968"
                            data-name="Path 3968"
                            d="M283.646,167.92H268.354a1,1,0,0,1,0-2h15.292a1,1,0,0,1,0,2Z"
                            fill="#ffffff"
                          />{' '}
                        </g>{' '}
                      </g>{' '}
                    </g>{' '}
                  </g>{' '}
                  <g id="Group_3032" data-name="Group 3032">
                    {' '}
                    <g id="Group_3031" data-name="Group 3031">
                      {' '}
                      <g id="Group_3030" data-name="Group 3030">
                        {' '}
                        <g id="Group_3029" data-name="Group 3029">
                          {' '}
                          <path
                            id="Path_3969"
                            data-name="Path 3969"
                            d="M283.646,171.92H268.354a1,1,0,0,1,0-2h15.292a1,1,0,0,1,0,2Z"
                            fill="#ffffff"
                          />{' '}
                        </g>{' '}
                      </g>{' '}
                    </g>{' '}
                  </g>{' '}
                  <g id="Group_3036" data-name="Group 3036">
                    {' '}
                    <g id="Group_3035" data-name="Group 3035">
                      {' '}
                      <g id="Group_3034" data-name="Group 3034">
                        {' '}
                        <g id="Group_3033" data-name="Group 3033">
                          {' '}
                          <path
                            id="Path_3970"
                            data-name="Path 3970"
                            d="M283.646,175.92H268.354a1,1,0,0,1,0-2h15.292a1,1,0,0,1,0,2Z"
                            fill="#ffffff"
                          />{' '}
                        </g>{' '}
                      </g>{' '}
                    </g>{' '}
                  </g>{' '}
                  <g id="Group_3040" data-name="Group 3040">
                    {' '}
                    <g id="Group_3039" data-name="Group 3039">
                      {' '}
                      <g id="Group_3038" data-name="Group 3038">
                        {' '}
                        <g id="Group_3037" data-name="Group 3037">
                          {' '}
                          <path
                            id="Path_3971"
                            data-name="Path 3971"
                            d="M275.823,179.92h-7.469a1,1,0,0,1,0-2h7.469a1,1,0,0,1,0,2Z"
                            fill="#ffffff"
                          />{' '}
                        </g>{' '}
                      </g>{' '}
                    </g>{' '}
                  </g>{' '}
                </g>{' '}
              </g>{' '}
            </g>{' '}
          </g>
        </svg>
      </SvgIcon>
    );
  }

  if (type === 0.5) {
    // for list table view
    return (
      <SvgIcon fontSize="inherit" sx={{ mr: '5px', mt: '1px' }}>
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          fill="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {' '}
            <defs>
              {' '}
              <clipPath id="clip-notepad">
                {' '}
                <rect width="32" height="32" />{' '}
              </clipPath>{' '}
            </defs>{' '}
            <g id="notepad" clipPath="url(#clip-notepad)">
              {' '}
              <g
                id="Group_3042"
                data-name="Group 3042"
                transform="translate(-260 -156)"
              >
                {' '}
                <g id="Group_3024" data-name="Group 3024">
                  {' '}
                  <g id="Group_3023" data-name="Group 3023">
                    {' '}
                    <g id="Group_3022" data-name="Group 3022">
                      {' '}
                      <g id="Group_3021" data-name="Group 3021">
                        {' '}
                        <path
                          id="Path_3967"
                          data-name="Path 3967"
                          d="M287.632,157.923h-3.559v-.757a1,1,0,0,0-2,0v.757h-2.721v-.757a1,1,0,1,0-2,0v.757h-2.721v-.757a1,1,0,0,0-2,0v.757H269.91v-.757a1,1,0,0,0-2,0v.757h-3.542a1,1,0,0,0-1,1v27.911a1,1,0,0,0,1,1h23.264a1,1,0,0,0,1-1V158.923A1,1,0,0,0,287.632,157.923Zm-1,27.911H265.368V159.923h2.542v.756a1,1,0,0,0,2,0v-.756h2.721v.756a1,1,0,0,0,2,0v-.756h2.721v.756a1,1,0,0,0,2,0v-.756h2.721v.756a1,1,0,0,0,2,0v-.756h2.559Z"
                          fill="#ffffff"
                        />{' '}
                      </g>{' '}
                    </g>{' '}
                  </g>{' '}
                </g>{' '}
                <g id="Group_3041" data-name="Group 3041">
                  {' '}
                  <g id="Group_3028" data-name="Group 3028">
                    {' '}
                    <g id="Group_3027" data-name="Group 3027">
                      {' '}
                      <g id="Group_3026" data-name="Group 3026">
                        {' '}
                        <g id="Group_3025" data-name="Group 3025">
                          {' '}
                          <path
                            id="Path_3968"
                            data-name="Path 3968"
                            d="M283.646,167.92H268.354a1,1,0,0,1,0-2h15.292a1,1,0,0,1,0,2Z"
                            fill="#ffffff"
                          />{' '}
                        </g>{' '}
                      </g>{' '}
                    </g>{' '}
                  </g>{' '}
                  <g id="Group_3032" data-name="Group 3032">
                    {' '}
                    <g id="Group_3031" data-name="Group 3031">
                      {' '}
                      <g id="Group_3030" data-name="Group 3030">
                        {' '}
                        <g id="Group_3029" data-name="Group 3029">
                          {' '}
                          <path
                            id="Path_3969"
                            data-name="Path 3969"
                            d="M283.646,171.92H268.354a1,1,0,0,1,0-2h15.292a1,1,0,0,1,0,2Z"
                            fill="#ffffff"
                          />{' '}
                        </g>{' '}
                      </g>{' '}
                    </g>{' '}
                  </g>{' '}
                  <g id="Group_3036" data-name="Group 3036">
                    {' '}
                    <g id="Group_3035" data-name="Group 3035">
                      {' '}
                      <g id="Group_3034" data-name="Group 3034">
                        {' '}
                        <g id="Group_3033" data-name="Group 3033">
                          {' '}
                          <path
                            id="Path_3970"
                            data-name="Path 3970"
                            d="M283.646,175.92H268.354a1,1,0,0,1,0-2h15.292a1,1,0,0,1,0,2Z"
                            fill="#ffffff"
                          />{' '}
                        </g>{' '}
                      </g>{' '}
                    </g>{' '}
                  </g>{' '}
                  <g id="Group_3040" data-name="Group 3040">
                    {' '}
                    <g id="Group_3039" data-name="Group 3039">
                      {' '}
                      <g id="Group_3038" data-name="Group 3038">
                        {' '}
                        <g id="Group_3037" data-name="Group 3037">
                          {' '}
                          <path
                            id="Path_3971"
                            data-name="Path 3971"
                            d="M275.823,179.92h-7.469a1,1,0,0,1,0-2h7.469a1,1,0,0,1,0,2Z"
                            fill="#ffffff"
                          />{' '}
                        </g>{' '}
                      </g>{' '}
                    </g>{' '}
                  </g>{' '}
                </g>{' '}
              </g>{' '}
            </g>{' '}
          </g>
        </svg>
      </SvgIcon>
    );
  }

  return (
    <SvgIcon fontSize="small">
      <svg
        viewBox="0 0 24 24"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        fill="#ffffff"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          {' '}
          Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer
          Tools <title>ic_fluent_incognito_24_filled</title>{' '}
          <desc>Created with Sketch.</desc>{' '}
          <g
            id="🔍-Product-Icons"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            {' '}
            <g
              id="ic_fluent_incognito_24_filled"
              fill="#ffffff"
              fillRule="nonzero"
            >
              {' '}
              <path
                d="M17.5,11.75 C20.1233526,11.75 22.25,13.8766474 22.25,16.5 C22.25,19.1233526 20.1233526,21.25 17.5,21.25 C15.4019872,21.25 13.6216629,19.8898135 12.9927596,18.0031729 L11.0072404,18.0031729 C10.3783371,19.8898135 8.59801283,21.25 6.5,21.25 C3.87664744,21.25 1.75,19.1233526 1.75,16.5 C1.75,13.8766474 3.87664744,11.75 6.5,11.75 C8.9545808,11.75 10.9743111,13.6118164 11.224028,16.0002862 L12.775972,16.0002862 C13.0256889,13.6118164 15.0454192,11.75 17.5,11.75 Z M6.5,13.75 C4.98121694,13.75 3.75,14.9812169 3.75,16.5 C3.75,18.0187831 4.98121694,19.25 6.5,19.25 C8.01878306,19.25 9.25,18.0187831 9.25,16.5 C9.25,14.9812169 8.01878306,13.75 6.5,13.75 Z M17.5,13.75 C15.9812169,13.75 14.75,14.9812169 14.75,16.5 C14.75,18.0187831 15.9812169,19.25 17.5,19.25 C19.0187831,19.25 20.25,18.0187831 20.25,16.5 C20.25,14.9812169 19.0187831,13.75 17.5,13.75 Z M15.5119387,3 C16.7263613,3 17.7969992,3.79658742 18.145961,4.95979331 L19.1520701,8.31093387 C19.944619,8.44284508 20.7202794,8.59805108 21.4790393,8.77658283 C22.0166428,8.90307776 22.3499121,9.44143588 22.2234172,9.9790393 C22.0969222,10.5166428 21.5585641,10.8499121 21.0209607,10.7234172 C18.2654221,10.0750551 15.258662,9.75 12,9.75 C8.74133802,9.75 5.73457794,10.0750551 2.97903933,10.7234172 C2.44143588,10.8499121 1.90307776,10.5166428 1.77658283,9.9790393 C1.6500879,9.44143588 1.98335721,8.90307776 2.52096067,8.77658283 C3.27940206,8.59812603 4.05472975,8.4429754 4.8469317,8.31110002 L5.85403902,4.95979331 C6.20300079,3.79658742 7.2736387,3 8.4880613,3 L15.5119387,3 Z"
                id="🎨-Color"
              >
                {' '}
              </path>{' '}
            </g>{' '}
          </g>{' '}
        </g>
      </svg>
    </SvgIcon>
  );
}

export function SeasonIcons({ season }: any) {
  if (season === 'WINTER') {
    return (
      <SvgIcon>
        <svg
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          className="iconify iconify--twemoji"
          preserveAspectRatio="xMidYMid meet"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            <path
              fill="#88C9F9"
              d="M19 27.586V8.415l4.828-4.829s.707-.707 0-1.415c-.707-.707-1.414 0-1.414 0L19 5.586V1s0-1-1-1s-1 1-1 1v4.586l-3.414-3.415s-.707-.707-1.414 0c-.707.708 0 1.415 0 1.415L17 8.415v19.171l-4.828 4.828s-.707.707 0 1.414s1.414 0 1.414 0L17 30.414V35s0 1 1 1s1-1 1-1v-4.586l3.414 3.414s.707.707 1.414 0s0-1.414 0-1.414L19 27.586z"
            />
            <path
              fill="#88C9F9"
              d="M34.622 20.866c-.259-.966-1.225-.707-1.225-.707l-6.595 1.767l-16.603-9.586l-1.767-6.595s-.259-.966-1.225-.707C6.24 5.297 6.5 6.263 6.5 6.263l1.25 4.664l-3.972-2.294s-.866-.5-1.366.366c-.5.866.366 1.366.366 1.366l3.971 2.293l-4.664 1.249s-.967.259-.707 1.225c.259.967 1.225.708 1.225.708l6.596-1.767l16.603 9.586l1.767 6.596s.259.966 1.225.707c.966-.26.707-1.225.707-1.225l-1.25-4.664l3.972 2.293s.867.5 1.367-.365c.5-.867-.367-1.367-.367-1.367l-3.971-2.293l4.663-1.249c0-.001.966-.26.707-1.226z"
            />
            <path
              fill="#88C9F9"
              d="M33.915 13.907l-4.664-1.25l3.972-2.293s.867-.501.367-1.367c-.501-.867-1.367-.366-1.367-.366l-3.971 2.292l1.249-4.663s.259-.966-.707-1.225c-.966-.259-1.225.707-1.225.707l-1.767 6.595l-16.604 9.589l-6.594-1.768s-.966-.259-1.225.707c-.26.967.707 1.225.707 1.225l4.663 1.249l-3.971 2.293s-.865.501-.365 1.367c.5.865 1.365.365 1.365.365l3.972-2.293l-1.25 4.663s-.259.967.707 1.225c.967.26 1.226-.706 1.226-.706l1.768-6.597l16.604-9.585l6.595 1.768s.966.259 1.225-.707c.255-.967-.71-1.225-.71-1.225z"
            />
          </g>
        </svg>
      </SvgIcon>
    );
  }
  if (season === 'SPRING') {
    return (
      <SvgIcon>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {' '}
            <path
              opacity="0.1"
              d="M4.44905 17.0091C-0.246262 7.83768 7.34063 0.686186 19.5547 3.61251C20.4161 3.81888 21.0082 4.6099 20.9652 5.49458C20.5863 13.288 17.0342 17.7048 6.13264 17.9858C5.43034 18.0039 4.7692 17.6344 4.44905 17.0091Z"
              fill="#618a3d"
            />{' '}
            <path
              d="M4.44905 17.0091C-0.246262 7.83768 7.34063 0.686186 19.5547 3.61251C20.4161 3.81888 21.0082 4.6099 20.9652 5.49458C20.5863 13.288 17.0342 17.7048 6.13264 17.9858C5.43034 18.0039 4.7692 17.6344 4.44905 17.0091Z"
              stroke="#618a3d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />{' '}
            <path
              d="M3.99987 21C5.49993 15.5 5.99988 12.5 11.9998 9.99997"
              stroke="#618a3d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />{' '}
          </g>
        </svg>
      </SvgIcon>
    );
  }
  if (season === 'SUMMER') {
    return (
      <SvgIcon>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {' '}
            <path
              d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z"
              fill="#ffdc00"
            />{' '}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V3C12.75 3.41421 12.4142 3.75 12 3.75C11.5858 3.75 11.25 3.41421 11.25 3V2C11.25 1.58579 11.5858 1.25 12 1.25ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H3C3.41421 11.25 3.75 11.5858 3.75 12C3.75 12.4142 3.41421 12.75 3 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM20.25 12C20.25 11.5858 20.5858 11.25 21 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H21C20.5858 12.75 20.25 12.4142 20.25 12ZM12 20.25C12.4142 20.25 12.75 20.5858 12.75 21V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V21C11.25 20.5858 11.5858 20.25 12 20.25Z"
              fill="#ffdc00"
            />{' '}
            <g opacity="0.5">
              {' '}
              <path
                d="M4.39838 4.39838C4.69127 4.10549 5.16615 4.10549 5.45904 4.39838L5.85188 4.79122C6.14477 5.08411 6.14477 5.55898 5.85188 5.85188C5.55898 6.14477 5.08411 6.14477 4.79122 5.85188L4.39838 5.45904C4.10549 5.16615 4.10549 4.69127 4.39838 4.39838Z"
                fill="#ffdc00"
              />{' '}
              <path
                d="M19.6009 4.39864C19.8938 4.69153 19.8938 5.16641 19.6009 5.4593L19.2081 5.85214C18.9152 6.14503 18.4403 6.14503 18.1474 5.85214C17.8545 5.55924 17.8545 5.08437 18.1474 4.79148L18.5402 4.39864C18.8331 4.10575 19.308 4.10575 19.6009 4.39864Z"
                fill="#ffdc00"
              />{' '}
              <path
                d="M18.1474 18.1474C18.4403 17.8545 18.9152 17.8545 19.2081 18.1474L19.6009 18.5402C19.8938 18.8331 19.8938 19.308 19.6009 19.6009C19.308 19.8938 18.8331 19.8938 18.5402 19.6009L18.1474 19.2081C17.8545 18.9152 17.8545 18.4403 18.1474 18.1474Z"
                fill="#ffdc00"
              />{' '}
              <path
                d="M5.85188 18.1477C6.14477 18.4406 6.14477 18.9154 5.85188 19.2083L5.45904 19.6012C5.16615 19.8941 4.69127 19.8941 4.39838 19.6012C4.10549 19.3083 4.10549 18.8334 4.39838 18.5405L4.79122 18.1477C5.08411 17.8548 5.55898 17.8548 5.85188 18.1477Z"
                fill="#ffdc00"
              />{' '}
            </g>{' '}
          </g>
        </svg>
      </SvgIcon>
    );
  }
  if (season === 'FALL') {
    return (
      <SvgIcon>
        <svg
          height="200px"
          width="200px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 25.263 25.263"
          xmlSpace="preserve"
          fill="orange"
          transform="rotate(45)"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {' '}
            <g>
              {' '}
              <path d="M15.362,9.69c0,0-0.75,1.108-1.068,0c-0.318-1.109-1.346-4.949-1.762-5.226 c-0.417-0.278-0.417-0.278-0.417-0.278s-0.078,1.506-0.594,1.307c-0.515-0.198-4.313-2.217-4.63-2.652L6.574,2.444 c0,0,0.355,3.328-0.515,2.615c0,0,1.113,2.771-2.573,3.048c0,0,1.186,3.087,4.552,4.75c0,0,1.148,1.783-0.949,1.503 c0,0-2.932-0.395-3.325-0.752c0,0-1.548,3.01-3.764,3.128c0,0,2.656,1.504,2.337,4.156c0,0,5.107,0.041,4.911,0.832 c-0.2,0.795-0.555,1.601-0.555,1.601s4.71-0.929,5.422-2.194c0,0,0.989,0.99,1.071,1.939c0,0,2.693-0.594,2.452-2.296 c0,0,1.269,0.948,1.427,2.551l0.554-0.375c0,0-0.319-1.661-1.464-2.967c0,0-0.517-1.308,0.789-0.633c0,0,3.085,1.029,5.7-0.833 c0,0-2.888-0.948-3.006-1.978c0,0,5.394-3.326,5.625-5.542c0,0-1.944,0.198-2.972-0.633c0,0-1.309-0.396,0.394-4.791 c0,0-1.227,0.724-1.62-3.636c0,0-3.051,4.665-4.518,3.082C16.548,5.018,15.165,8.066,15.362,9.69z" />{' '}
            </g>{' '}
          </g>
        </svg>
      </SvgIcon>
    );
  }
  return <SvgIcon />;
}

export function OnListIcon({ type }: any) {
  if (type === 0) {
    return <PlaylistAddCheckIcon fontSize="small" />;
  }
  if (type === 0.5) {
    return <CheckCircleIcon sx={{ mr: '5px', mt: '1px' }} fontSize="inherit" />;
  }
  return <SvgIcon />;
}
