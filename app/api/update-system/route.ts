import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// export const POST = async (req: NextRequest) => {
//   try {
//     const body = await req.json();
//     console.log(body);

//     const users = await prisma.user.findMany({
//       where: {
//         userPackages: {
//           some: {
//             package: {
//               name: body.name
//             }
//           }
//         }
//       },
//       include: {
//         userCompany: true,
//         system: true,
//         adminDetails: true,
//         userPackages: {
//           include: {
//             package: true
//           }
//         }
//       }
//     });

//     if (users.length === 0) {
//       return NextResponse.json({ error: "No users found" }, { status: 404 });
//     }

//     if (users[0].system.length === 0) {
//       return NextResponse.json({ error: "system not found" }, { status: 404 });
//     }

//     const system = 

//     console.log("Users with this package:", JSON.stringify(users, null, 2));

//     return NextResponse.json({
//       success: true,
//       users
//     });

//   } catch (err: any) {
//     console.log(err.message);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// };

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const users = await prisma.user.findMany({
      where: {
        userPackages: {
          some: {
            package: {
              name: body.name
            }
          }
        }
      },
      include: {
        userCompany: true,
        system: true,
        adminDetails: true,
        userPackages: {
          include: {
            package: true
          }
        }
      }
    });

    if (users.length === 0) {
      return NextResponse.json({ error: "No users found" }, { status: 404 });
    }

    const systems = [
      ...new Map(
        users.flatMap(u => u.system).map(s => [s.url, s])
      ).values()
    ];

    if (systems.length === 0) {
      return NextResponse.json({ error: "system not found" }, { status: 404 });
    }

    // background job
    setImmediate(async () => {
      await Promise.allSettled(
        systems.map(async (sys) => {
          if (!sys.url) return;

          try {
            const controller = new AbortController();
            setTimeout(() => controller.abort(), 5000);

            const res = await fetch(`${sys.url}/api/update`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(body),
              signal: controller.signal
            });

            if (!res.ok) {
              console.error("Failed:", sys.url);
            } else {
              const json = await res.json();
            }

          } catch (err) {
            console.error("Error calling", sys.url, err);
          }
        })
      );
    });

    // return immediately
    return NextResponse.json({
      success: true,
      message: "Broadcast started",
      systemsTargeted: systems.length
    });

  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};